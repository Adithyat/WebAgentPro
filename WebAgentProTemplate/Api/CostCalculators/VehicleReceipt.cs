using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentProTemplate.Api.Models;

namespace WebAgentProTemplate.Api.CostCalculators
{
    public class VehicleReceipt
    {
        public decimal BaseCost;
        public decimal FinalCost;
        public Dictionary<String, decimal> vehicleAppliedDiscounts;
        public Vehicle vehicle;


        public VehicleReceipt(Vehicle vehicle)
        {
            this.vehicle = vehicle;
            vehicleAppliedDiscounts = new Dictionary<string, decimal>();
            BaseCost = QuoteCostCalculator.VehicleBaseCostMultiplier * vehicle.CurrentValue;
            FinalCost = BaseCost;
        }
    }
}
