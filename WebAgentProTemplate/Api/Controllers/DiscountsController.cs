using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAgentPro.Data;
using WebAgentProTemplate.Api.Models;

namespace WebAgentProTemplate.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly WapDbContext _context;

        public DiscountsController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Discounts
        [Authorize(Policy = "ManagerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Discount>>> GetDiscounts()
        {
            return await _context.Discounts.ToListAsync();
        }

        // GET: api/Discounts/5
        //[Authorize(Policy = "ManagerOnly")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Discount>> GetDiscount(string id)
        {
            var discount = await _context.Discounts.FindAsync(id);

            if (discount == null)
            {
                return NotFound();
            }

            return discount;
        }

        // PUT: api/Discounts/5
        //[Authorize(Policy = "ManagerOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiscount(string id, Discount discount)
        {
            if (id != discount.StateCode)
            {
                return BadRequest();
            }

            _context.Entry(discount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Discounts
        //[Authorize(Policy = "ManagerOnly")]
        [HttpPost]
        public async Task<ActionResult<Discount>> PostDiscount(Discount discount)
        {
            _context.Discounts.Add(discount);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DiscountExists(discount.StateCode))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDiscount", new { id = discount.StateCode }, discount);
        }

        // DELETE: api/Discounts/5
        //[Authorize(Policy = "ManagerOnly")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Discount>> DeleteDiscount(string id)
        {
            var discount = await _context.Discounts.FindAsync(id);
            if (discount == null)
            {
                return NotFound();
            }

            _context.Discounts.Remove(discount);
            await _context.SaveChangesAsync();

            return discount;
        }

        private bool DiscountExists(string id)
        {
            return _context.Discounts.Any(e => e.StateCode == id);
        }
    }
}
