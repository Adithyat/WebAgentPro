using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentProTemplate.Api.Models;

namespace WebAgentProTemplate.Api.CostCalculators
{
    public class DriverReceipt
    {
        public decimal BaseCost;
        public decimal FinalCost;
        public Dictionary<String, decimal> driverAppliedDiscounts;
        public Driver driver;
        public decimal multiplier;

        public DriverReceipt(Driver driver)
        {
            this.driver = driver;
            driverAppliedDiscounts = new Dictionary<string, decimal>();
            BaseCost = QuoteCostCalculator.DriverBaseCost;
            FinalCost = BaseCost;
            multiplier = 1.00m;
        }
    }
}
