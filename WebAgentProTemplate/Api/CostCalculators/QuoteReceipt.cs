using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAgentProTemplate.Api.Models;

namespace WebAgentProTemplate.Api.CostCalculators
{
    public class QuoteReceipt
    {
        public decimal BaseCost;
        public decimal FinalCost;
        public Dictionary<String, decimal> AppliedDiscounts;
        public List<DriverReceipt> drivers;
        public List<VehicleReceipt> vehicles;
        public Quote quote;

        public QuoteReceipt(Quote quote)
        {
            this.quote = quote;
            AppliedDiscounts = new Dictionary<string, decimal>();
            drivers = new List<DriverReceipt>();
            vehicles = new List<VehicleReceipt>();
        }
    }
}
