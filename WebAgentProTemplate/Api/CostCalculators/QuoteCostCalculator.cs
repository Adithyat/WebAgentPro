using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentPro.Data;
using WebAgentProTemplate.Api.Models;


namespace WebAgentProTemplate.Api.CostCalculators
{
    public class QuoteCostCalculator
    {
        private readonly WapDbContext _context;
        static decimal DriverBaseCost = 200m;
        static decimal QuoteBaseCost = 100m;
        static decimal VehicleBaseCostMultiplier = .03m;

        public QuoteCostCalculator(WapDbContext context)
        {
            _context = context;
        }

        public decimal CalculateQuoteCost(long Id)
        {
            decimal drivers_sum_cost = 0.00M;
            decimal vehicles_sum_cost = 0.00M;
            Quote current = _context.Quotes.Where(t => t.QuoteId == Id).First();
            List<Driver> drivers = _context.Drivers.Where(t => t.QuoteId == Id).ToList();
            List<Vehicle> vehicles = _context.Vehicles.Where(t => t.QuoteId == Id).ToList();

            foreach (Driver driver in drivers)
            {
                drivers_sum_cost += CalculateDriverMultiplier(driver) * DriverBaseCost;
            }

            foreach (Vehicle vehicle in vehicles)
            {
                vehicles_sum_cost += CalculateVehicleCost(vehicle);
            }

            decimal base_quote_cost = QuoteBaseCost + drivers_sum_cost + vehicles_sum_cost;
            decimal quote_multiplier = 1.00m;

            if (current.ClaimInLastFiveYears.GetValueOrDefault())
            {
                quote_multiplier *= (decimal)current.ClaimInLastFiveYearsValue;
            }

            if (current.ForceMultiCarDiscount.GetValueOrDefault() || vehicles.Count() > 1)
            {
                quote_multiplier *= (decimal)current.ForceMultiCarDiscoutValue;
            }

            if (current.LessThanThreeYearsDriving.GetValueOrDefault())
            {
                quote_multiplier *= (decimal)current.LessThanThreeYearsDrivingValue;
            }

            if (current.MovingViolationInLastFiveYears.GetValueOrDefault())
            {
                quote_multiplier *= (decimal)current.MovingViolationInLastFiveYearsValue;
            }

            if (current.PreviousCarrier.GetValueOrDefault() == PreviousCarrier.Lizard)
            {
                quote_multiplier *= (decimal)current.PreviousCarrierValue;
            }

            return base_quote_cost * quote_multiplier;

        }

        public decimal CalculateDriverMultiplier(Driver driver)
        {
            decimal multiplier = 1.00m;

            if (driver.SafeDrivingSchoolAttended)
            {
                multiplier *= driver.SafeDrivingSchoolAttendedValue;
            }
            if (driver.D_DateOfBirth > DateTime.Now.AddYears(-23))
            {
                multiplier *= driver.UnderAgeOf23DiscountValue;
            }
            return multiplier;
        }

        public decimal CalculateVehicleCost(Vehicle vehicle)
        {
            decimal multiplier = 1.00m;
            if (vehicle.AnnualMileage < 6000)
            {
                multiplier *= vehicle.AnnualMileageDiscountValue;
            }

            if (vehicle.AntiLockBrakes)
            {
                multiplier *= vehicle.AntiLockBrakesValue;
            }
            if (vehicle.AntiTheft)
            {
                multiplier *= vehicle.AntiTheftValue;
            }

            if (vehicle.DaysDrivenPerWeek > 4)
            {
                multiplier *= vehicle.DaysDrivenPerWeekDiscountValue;
            }

            if (vehicle.MilesDrivenToWork < 25)
            {
                multiplier *= vehicle.MileDrivenToWorkDiscountValue;
            }

            if (vehicle.DayTimeRunningLights)
            {
                multiplier *= vehicle.DaytTimeRunningLightsValue;
            }

            if (vehicle.GarageDifferentAddressThanResidence)
            {
                multiplier *= vehicle.GarageDifferentAddressThanResidenceValue;
            }

            if (vehicle.PassiveRestraints)
            {
                multiplier *= vehicle.PassiveRestraintsValue;
            }

            if (vehicle.ReducedUsedDiscount)
            {
                multiplier *= vehicle.ReducedUsedDiscountValue;
            }

            // A primary driver MUST be on a car
            Driver PrimaryDriver = _context.Drivers.Where(t => t.DriverId == vehicle.DriverId).First();
            decimal DriverMultiplier = CalculateDriverMultiplier(PrimaryDriver);

            return DriverMultiplier * multiplier * VehicleBaseCostMultiplier * vehicle.CurrentValue;
        }
    }
}
