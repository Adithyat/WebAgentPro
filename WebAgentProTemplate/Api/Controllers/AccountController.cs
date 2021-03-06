using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using WebAgentPro.Data;
using WebAgentPro.Models;
using WebAgentPro.ViewModels;
using WebAgentPro.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAgentPro.Controllers
{
    [ApiController]
    //[AllowAnonymous]
    [Route("api/account")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class AccountsController : ControllerBase
    {
        private WapDbContext _context;
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(WapDbContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration, 
            ILogger<AccountsController> logger)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
        }

        //[Authorize(Policy = "ManagerOnly")]
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [Authorize(Policy = "ManagerOnly")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveAgent(string id)
        {
            var agent = _context.Users.Where(u => u.Id == id).FirstOrDefault();
            agent.UserStatus = UserStatus.Active;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("approve/pending")]
        public async Task<IActionResult> ApproveAllPending()
        {
            var pending_users = _context.Users.Where(u => u.UserStatus == UserStatus.Pending).ToList();
            foreach (var user in pending_users)
            {
                user.UserStatus = UserStatus.Active;
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> ChangeUserStatus(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest("Incorrect ID");
            }



            _context.Users.Update(user);
            await _context.SaveChangesAsync();



            return Ok();
        }

        /// <summary>
        /// Registers a new user with Web Agent Pro.
        /// </summary>
        /// <param name="userRegistration">Registration information including First Name, Last Name, User Name, and Password.</param>
        /// <returns>No return value.</returns>
        [HttpPost("register", Name = "Register")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ModelStateDictionary), 400)]
        [ProducesResponseType(typeof(WapExceptionViewModel), 400)]
        public async Task<IActionResult> Register(UserRegistration userRegistration)
        {
            Console.WriteLine("Entering registration flow");
            Console.WriteLine(userRegistration.ToString());
            User newUser = Mapper.Map<User>(userRegistration);
            if (userRegistration.isManager)
            {
                newUser.Role = 1;
            } else
            {
                newUser.Role = 0;
            }
            if (newUser.Role == 0)
            {
                newUser.UserStatus = UserStatus.Pending;
            } else
            {
                newUser.UserStatus = UserStatus.Active;
            }

            try
            {
                var createResult = await _userManager.CreateAsync(newUser, userRegistration.Password);
                if (!createResult.Succeeded)
                {
                    var appEx = new WapException("Unable to register user.");
                    createResult.Errors.ToList().ForEach(error=>appEx.Details.Add(error.Description));
                    throw appEx;
                }


                return Ok();
            }
            catch (WapException e)
            {
                return BadRequest(e.AsViewModel());
            }
        }

        /// <summary>
        /// Authenticates provided credentials and returns user information including a JWT Bearer token. The token should be used in subsequent calls to restricted APIs.
        /// </summary>
        /// <param name="credentials">The username and password to be authenticated.</param>
        /// <returns>A user object including First Name, Last Name, User Name, Roles, and JWT Token.</returns>
        [HttpPost("authenticate", Name = "Authenticate")]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(typeof(ModelStateDictionary), 400)]
        [ProducesResponseType(typeof(WapExceptionViewModel), 400)]
        public async Task<IActionResult> Authenticate(UserCredentials credentials)
        {
            try
            {
                //var authenticatedUser = await _repository.Authenticate(credentials.UserName, credentials.Password);
                var user = await _userManager.FindByNameAsync(credentials.UserName);
                if (user == null)
                {
                    throw new WapException("No user found with that username.");
                }

                if (user.UserStatus == UserStatus.Pending)
                {
                    throw new WapException("User not approved by a manager yet!");

                }

                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, false);
                if (!signInResult.Succeeded)
                {
                    throw new WapException("Unable to authenticate user credentials.");
                }

                var userViewModel = Mapper.Map<UserViewModel>(user);
                //userViewModel.Roles = await _userManager.GetRolesAsync(user);
                //userViewModel.Roles.
                if (user.Role == 0) {
                    userViewModel.Roles.Add("Agent");
                }
                if (user.Role == 1)
                {
                    userViewModel.Roles.Add("Manager");
                }
                userViewModel.Token = CreateToken(user, userViewModel.Roles);
                return Ok(userViewModel);
            }
            catch (WapException e)
            {
                return BadRequest(e.AsViewModel());
            }
        }

        private string CreateToken(User authenticatedUser, IList<string> roles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]);

            var subjectClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, authenticatedUser.UserName),
            };

            if (authenticatedUser.Role == 1) //manager
            {
                subjectClaims.Add(new Claim("Manager", "Manager"));            }
            else if (authenticatedUser.Role == 0) // agent
            {
                subjectClaims.Add(new Claim("Agent", "Agent")); 

            }

            subjectClaims.Add(new Claim("strID", authenticatedUser.Id));

            subjectClaims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(subjectClaims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
