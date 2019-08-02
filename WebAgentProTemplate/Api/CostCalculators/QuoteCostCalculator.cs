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
                receipt.driverReceipts.Add(CalculateDriverReceipt(driver));
            }

            foreach (Vehicle vehicle in vehicles)
            {
                receipt.vehicleReceipts.Add(CalculateVehicleReceipt(vehicle));
            }

            receipt.BaseCost = QuoteBaseCost + receipt.driverReceipts.Sum(item => item.FinalCost) 
                                    + receipt.vehicleReceipts.Sum(item => item.FinalCost);

            receipt.FinalCost = receipt.BaseCost;

            if (current.ClaimInLastFiveYears.GetValueOrDefault())
            {
                receipt.quoteAppliedDiscounts.Add("ClaimInLastFiveYears", receipt.FinalCost - (receipt.FinalCost * (decimal)current.ClaimInLastFiveYearsValue));
                receipt.FinalCost *= (decimal)current.ClaimInLastFiveYearsValue;
            }

            if (current.ForceMultiCarDiscount.GetValueOrDefault() || vehicles.Count() > 1)
            {
                receipt.quoteAppliedDiscounts.Add("MulticarDiscount", receipt.FinalCost - (receipt.FinalCost * (decimal)current.ForceMultiCarDiscoutValue));
                receipt.FinalCost *= (decimal)current.ForceMultiCarDiscoutValue;
            }

            if (current.LessThanThreeYearsDriving.GetValueOrDefault())
            {
                receipt.quoteAppliedDiscounts.Add("LessThanThreeYearsDriving", receipt.FinalCost - (receipt.FinalCost * (decimal)current.LessThanThreeYearsDrivingValue));
                receipt.FinalCost *= (decimal)current.LessThanThreeYearsDrivingValue;
            }

            if (current.MovingViolationInLastFiveYears.GetValueOrDefault())
            {
                receipt.quoteAppliedDiscounts.Add("MovingViolationsInLast5Years", receipt.FinalCost - (receipt.FinalCost * (decimal)current.MovingViolationInLastFiveYearsValue));
                receipt.FinalCost *= (decimal)current.MovingViolationInLastFiveYearsValue;
            }

            // if there is an issue, it will be here.
            if (current.PreviousCarrier.GetValueOrDefault() == PreviousCarrier.Lizard ||
                current.PreviousCarrier.GetValueOrDefault() == PreviousCarrier.Pervasive)
            {
                receipt.quoteAppliedDiscounts.Add("PreviousCarrier", receipt.FinalCost - (receipt.FinalCost * (decimal)current.PreviousCarrierValue));
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
                receipt.driverAppliedDiscounts.Add("SafeDrivingSchool", receipt.FinalCost - (receipt.FinalCost * driver.SafeDrivingSchoolAttendedValue));
                receipt.FinalCost *= driver.SafeDrivingSchoolAttendedValue;
            }
            if (driver.D_DateOfBirth > DateTime.Now.AddYears(-23))
            {
                receipt.multiplier *= driver.UnderAgeOf23DiscountValue;
                receipt.driverAppliedDiscounts.Add("DriverUnderAgeOf23", receipt.FinalCost - (receipt.FinalCost * driver.UnderAgeOf23DiscountValue));
                receipt.FinalCost *= driver.UnderAgeOf23DiscountValue;
            }
            return receipt;
        }

        public VehicleReceipt CalculateVehicleReceipt(Vehicle vehicle)
        {
            VehicleReceipt receipt = new VehicleReceipt(vehicle);
            if (vehicle.AnnualMileage < 6000)
            {
                receipt.vehicleAppliedDiscounts.Add("VehicleAnnualMileageLessThan6000", receipt.FinalCost - (receipt.FinalCost * vehicle.AnnualMileageDiscountValue));
                receipt.FinalCost *= vehicle.AnnualMileageDiscountValue;
            }

            if (vehicle.AntiLockBrakes)
            {
                receipt.vehicleAppliedDiscounts.Add("AntilockBrakes",
                      receipt.FinalCost - (receipt.FinalCost * vehicle.AntiLockBrakesValue));
                receipt.FinalCost *= vehicle.AntiLockBrakesValue;
            }
            if (vehicle.AntiTheft)
            {
                receipt.vehicleAppliedDiscounts.Add("Antitheft", receipt.FinalCost - (receipt.FinalCost * vehicle.AntiTheftValue));
                receipt.FinalCost *= vehicle.AntiTheftValue;
            }

            if (vehicle.DaysDrivenPerWeek > 4)
            {
                receipt.vehicleAppliedDiscounts.Add("DaysDrivenPerWeekGreaterThan4", receipt.FinalCost - (receipt.FinalCost * vehicle.DaysDrivenPerWeekDiscountValue));
                receipt.FinalCost *= vehicle.DaysDrivenPerWeekDiscountValue;
            }

            if (vehicle.MilesDrivenToWork < 25)
            {
                receipt.vehicleAppliedDiscounts.Add("MilesDrivenToWorkLessThan25", receipt.FinalCost - (receipt.FinalCost * vehicle.MileDrivenToWorkDiscountValue));
                receipt.FinalCost *= vehicle.MileDrivenToWorkDiscountValue;
            }

            if (vehicle.DayTimeRunningLights)
            {
                receipt.vehicleAppliedDiscounts.Add("DaytimeRunningLights", receipt.FinalCost - (receipt.FinalCost * vehicle.DaytTimeRunningLightsValue));
                receipt.FinalCost *= vehicle.DaytTimeRunningLightsValue;
            }

            if (vehicle.GarageDifferentAddressThanResidence)
            {
                receipt.vehicleAppliedDiscounts.Add("GarageAddressDifferentThanResidence", receipt.FinalCost - (receipt.FinalCost * vehicle.GarageDifferentAddressThanResidenceValue));
                receipt.FinalCost *= vehicle.GarageDifferentAddressThanResidenceValue;
            }

            if (vehicle.PassiveRestraints)
            {
                receipt.vehicleAppliedDiscounts.Add("PassiveRestraints", receipt.FinalCost - (receipt.FinalCost * vehicle.PassiveRestraintsValue));
                receipt.FinalCost *= vehicle.PassiveRestraintsValue;
            }

            if (vehicle.ReducedUsedDiscount)
            {
                receipt.vehicleAppliedDiscounts.Add("ReducedUsedDiscount", receipt.FinalCost - (receipt.FinalCost * vehicle.ReducedUsedDiscountValue));
                receipt.FinalCost *= vehicle.ReducedUsedDiscountValue;
            }

            // A primary driver MUST be on a car
            Driver PrimaryDriver = _context.Drivers.Where(t => t.DriverId == vehicle.DriverId).First();
            decimal DriverMultiplier = CalculateDriverReceipt(PrimaryDriver).multiplier;

            receipt.vehicleAppliedDiscounts.Add("PrimaryOperator", receipt.FinalCost - (receipt.FinalCost * DriverMultiplier));
            receipt.FinalCost *= DriverMultiplier;
            return receipt;
        }
    }
}