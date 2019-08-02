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
        public static decimal DriverBaseCost = 200m;
        public static decimal QuoteBaseCost = 100m;
        public static decimal VehicleBaseCostMultiplier = .03m;

        public QuoteCostCalculator(WapDbContext context)
        {
            _context = context;
        }

        public QuoteReceipt CalculateQuoteCost(long Id)
        {
            Quote current = _context.Quotes.Where(t => t.QuoteId == Id).First();
            List<Driver> drivers = _context.Drivers.Where(t => t.QuoteId == Id).ToList();
            List<Vehicle> vehicles = _context.Vehicles.Where(t => t.QuoteId == Id).ToList();

            QuoteReceipt receipt = new QuoteReceipt(current);

            foreach (Driver driver in drivers)
            {
                receipt.drivers.Add(CalculateDriverReceipt(driver));
            }

            foreach (Vehicle vehicle in vehicles)
            {
                receipt.vehicles.Add(CalculateVehicleReceipt(vehicle));
            }

            receipt.BaseCost = QuoteBaseCost + receipt.drivers.Sum(item => item.FinalCost) 
                                    + receipt.vehicles.Sum(item => item.FinalCost);

            receipt.FinalCost = receipt.BaseCost;

            if (current.ClaimInLastFiveYears.GetValueOrDefault())
            {
                receipt.AppliedDiscounts.Add("Claim in Last Five Years", receipt.FinalCost - (receipt.FinalCost * (decimal)current.ClaimInLastFiveYearsValue));
                receipt.FinalCost *= (decimal)current.ClaimInLastFiveYearsValue;
            }

            if (current.ForceMultiCarDiscount.GetValueOrDefault() || vehicles.Count() > 1)
            {
                receipt.AppliedDiscounts.Add("Multicar discount", receipt.FinalCost - (receipt.FinalCost * (decimal)current.ForceMultiCarDiscoutValue));
                receipt.FinalCost *= (decimal)current.ForceMultiCarDiscoutValue;
            }

            if (current.LessThanThreeYearsDriving.GetValueOrDefault())
            {
                receipt.AppliedDiscounts.Add("Less Than Three Years Driving", receipt.FinalCost - (receipt.FinalCost * (decimal)current.LessThanThreeYearsDrivingValue));
                receipt.FinalCost *= (decimal)current.LessThanThreeYearsDrivingValue;
            }

            if (current.MovingViolationInLastFiveYears.GetValueOrDefault())
            {
                receipt.AppliedDiscounts.Add("Moving violations in Last 5 Years", receipt.FinalCost - (receipt.FinalCost * (decimal)current.MovingViolationInLastFiveYearsValue));
                receipt.FinalCost *= (decimal)current.MovingViolationInLastFiveYearsValue;
            }

            // if there is an issue, it will be here.
            if (current.PreviousCarrier.GetValueOrDefault() == PreviousCarrier.Lizard ||
                current.PreviousCarrier.GetValueOrDefault() == PreviousCarrier.Pervasive)
            {
                receipt.AppliedDiscounts.Add("Previous carrier", receipt.FinalCost - (receipt.FinalCost * (decimal)current.PreviousCarrierValue));
                receipt.FinalCost *= (decimal)current.PreviousCarrierValue;
            }

            return receipt;
        }

        public DriverReceipt CalculateDriverReceipt(Driver driver)
        {
            DriverReceipt receipt = new DriverReceipt(driver);


            if (driver.SafeDrivingSchoolAttended)
            {
                receipt.multiplier *= driver.SafeDrivingSchoolAttendedValue;
                receipt.AppliedDiscounts.Add("Safe Driving School", receipt.FinalCost - (receipt.FinalCost * driver.SafeDrivingSchoolAttendedValue));
                receipt.FinalCost *= driver.SafeDrivingSchoolAttendedValue;
            }
            if (driver.D_DateOfBirth > DateTime.Now.AddYears(-23))
            {
                receipt.multiplier *= driver.UnderAgeOf23DiscountValue;
                receipt.AppliedDiscounts.Add("Driver Under Age of 23", receipt.FinalCost - (receipt.FinalCost * driver.UnderAgeOf23DiscountValue));
                receipt.FinalCost *= driver.UnderAgeOf23DiscountValue;
            }
            return receipt;
        }

        public VehicleReceipt CalculateVehicleReceipt(Vehicle vehicle)
        {
            VehicleReceipt receipt = new VehicleReceipt(vehicle);
            if (vehicle.AnnualMileage < 6000)
            {
                receipt.AppliedDiscounts.Add("Vehicle Annual Mileage less than 6000", receipt.FinalCost - (receipt.FinalCost * vehicle.AnnualMileageDiscountValue));
                receipt.FinalCost *= vehicle.AnnualMileageDiscountValue;
            }

            if (vehicle.AntiLockBrakes)
            {
                receipt.AppliedDiscounts.Add("Antilock brakes",
                      receipt.FinalCost - (receipt.FinalCost * vehicle.AntiLockBrakesValue));
                receipt.FinalCost *= vehicle.AntiLockBrakesValue;
            }
            if (vehicle.AntiTheft)
            {
                receipt.AppliedDiscounts.Add("Antitheft", receipt.FinalCost - (receipt.FinalCost * vehicle.AntiTheftValue));
                receipt.FinalCost *= vehicle.AntiTheftValue;
            }

            if (vehicle.DaysDrivenPerWeek > 4)
            {
                receipt.AppliedDiscounts.Add("Days Driven Per Week Greater Than 4", receipt.FinalCost - (receipt.FinalCost * vehicle.DaysDrivenPerWeekDiscountValue));
                receipt.FinalCost *= vehicle.DaysDrivenPerWeekDiscountValue;
            }

            if (vehicle.MilesDrivenToWork < 25)
            {
                receipt.AppliedDiscounts.Add("Miles Driven to Work less than 25", receipt.FinalCost - (receipt.FinalCost * vehicle.MileDrivenToWorkDiscountValue));
                receipt.FinalCost *= vehicle.MileDrivenToWorkDiscountValue;
            }

            if (vehicle.DayTimeRunningLights)
            {
                receipt.AppliedDiscounts.Add("Daytime Running Lights", receipt.FinalCost - (receipt.FinalCost * vehicle.DaytTimeRunningLightsValue));
                receipt.FinalCost *= vehicle.DaytTimeRunningLightsValue;
            }

            if (vehicle.GarageDifferentAddressThanResidence)
            {
                receipt.AppliedDiscounts.Add("Garage address different than Residence", receipt.FinalCost - (receipt.FinalCost * vehicle.GarageDifferentAddressThanResidenceValue));
                receipt.FinalCost *= vehicle.GarageDifferentAddressThanResidenceValue;
            }

            if (vehicle.PassiveRestraints)
            {
                receipt.AppliedDiscounts.Add("Passive Restraints", receipt.FinalCost - (receipt.FinalCost * vehicle.PassiveRestraintsValue));
                receipt.FinalCost *= vehicle.PassiveRestraintsValue;
            }

            if (vehicle.ReducedUsedDiscount)
            {
                receipt.AppliedDiscounts.Add("Reduced Used Discount", receipt.FinalCost - (receipt.FinalCost * vehicle.ReducedUsedDiscountValue));
                receipt.FinalCost *= vehicle.ReducedUsedDiscountValue;
            }

            // A primary driver MUST be on a car
            Driver PrimaryDriver = _context.Drivers.Where(t => t.DriverId == vehicle.DriverId).First();
            decimal DriverMultiplier = CalculateDriverReceipt(PrimaryDriver).multiplier;

            receipt.AppliedDiscounts.Add("Primary operator", receipt.FinalCost - (receipt.FinalCost * DriverMultiplier));
            receipt.FinalCost *= DriverMultiplier;
            return receipt;
        }
    }
}