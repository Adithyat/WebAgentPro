using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using WebAgentPro.Api.Models;
using WebAgentPro.Models;
using WebAgentProTemplate.Api.Models;

namespace WebAgentPro.Data
{
    public class WapDbSeeder
    {
        private readonly WapDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public WapDbSeeder(WapDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void Seed()
        {
            InitializeRoles();
            InitializeUsers();

            //Initialize your data
            InitializeWidgets();
            InitializeDiscounts();
        }

        public void InitializeDiscounts()
        {
            if (_context.Discounts.Count<Discount>().Equals(0))
            {
                _context.Discounts.Add(new Discount
                {
                    StateCode = "VT",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .98M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,

                });

                _context.Discounts.Add(new Discount
                {
                    StateCode = "ME",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .99M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.23M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,

                });

                _context.Discounts.Add(new Discount
                {
                    StateCode = "MA",
                    DayTimeRunningLights = .98M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .95M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .99M,
                    ReduceUseDiscount = .96M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.20M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.25M,
                    ClaimInLastFiveYears = 1.25M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .94M,
                });

                _context.Discounts.Add(new Discount
                {
                    StateCode = "NH",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "CT",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .97M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "PA",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "NY",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .97M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .94M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .99M,
                    ReduceUseDiscount = 1.00M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.22M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = 1.00M,
                    MovingViolationInLastFiveYears = 1.30M,
                    ClaimInLastFiveYears = 1.30M,
                    MultiCarDiscount = 1.00M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .94M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "SC",
                    DayTimeRunningLights = .98M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = 1.00M,
                    PassiveRestraints = .98M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .99M,
                    ReduceUseDiscount = .96M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.18M,
                    PreviousCarrierLizardIns = 1.00M,
                    PreviousCarrierPervasiveStateIns = 1.00M,
                    MovingViolationInLastFiveYears = 1.15M,
                    ClaimInLastFiveYears = 1.22M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .93M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "WV",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.18M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,
                });


                _context.Discounts.Add(new Discount
                {
                    StateCode = "VA",
                    DayTimeRunningLights = .99M,
                    AntiLockBrakes = .98M,
                    AnnualMileage = .99M,
                    PassiveRestraints = .97M,
                    AntiTheftInstalled = .97M,
                    DaysDrivenPerWeek = 1.02M,
                    MilesDrivenToWork = .98M,
                    ReduceUseDiscount = .94M,
                    GarageAddressDifferentFromResidence = 1.03M,
                    CustomerLessThanThreeYearsDriving = 1.15M,
                    PreviousCarrierLizardIns = 1.05M,
                    PreviousCarrierPervasiveStateIns = .97M,
                    MovingViolationInLastFiveYears = 1.20M,
                    ClaimInLastFiveYears = 1.20M,
                    MultiCarDiscount = .95M,
                    DriverLessThanTwentyThree = 1.10M,
                    SafeDrivingSchoolAttended = .95M,
                });
            }

            _context.SaveChanges();
        }

        private void InitializeWidgets()
        {
            if (_context.Widgets.Count<Widget>().Equals(0))
            {
                _context.Widgets.Add(new Widget
                {
                    Name = "Seeded Widget",
                    Description = "This is a really cool widget. It does things no other widget can do.",
                    LastDesignReview = DateTime.Parse("1/1/2012")             
                });
            }

            _context.SaveChanges();
        }

        private void InitializeUsers()
        {
            if (_userManager.Users.Count<User>().Equals(0))
            {
                var manager = new User()
                {
                    UserName = "manager@aia.com",
                    Email = "manager@aia.com",
                    EmailConfirmed = true,
                    U_FirstName = "Jacob",
                    U_LastName = "Jones"
                };

                _userManager.CreateAsync(manager, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(manager, "Manager").Wait();

                var agent = new User()
                {
                    UserName = "agent@aia.com",
                    Email = "agent@aia.com",
                    EmailConfirmed = true,
                    U_FirstName = "Janet",
                    U_LastName = "Roberts"
                };

                _userManager.CreateAsync(agent, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(agent, "Agent").Wait();

                var manager2= new User()
                {
                    UserName = "manager2@aia.com",
                    Email = "manager2@aia.com",
                    EmailConfirmed = true,
                    U_FirstName = "Jacob",
                    U_LastName = "Johnson"
                };

                _userManager.CreateAsync(manager2, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(manager2, "Manager").Wait();

                var agent2 = new User()
                {
                    UserName = "agent2@aia.com",
                    Email = "agent2@aia.com",
                    EmailConfirmed = true,
                    U_FirstName = "Janet",
                    U_LastName = "Robertson",
                };

                _userManager.CreateAsync(agent2, "Asdfjkl!1").Wait();
                _userManager.AddToRoleAsync(agent2, "Agent").Wait();
            }

        }

        private void InitializeRoles()
        {
            if (_roleManager.Roles.Count<IdentityRole>().Equals(0))
            {
                _roleManager.CreateAsync(new IdentityRole() { Name = "Registered" }).Wait();
                _roleManager.CreateAsync(new IdentityRole() { Name = "Agent" }).Wait();
                _roleManager.CreateAsync(new IdentityRole() { Name = "Manager" }).Wait();
            }
        }
    }
}
