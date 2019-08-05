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
        public Dictionary<String, decimal> quoteAppliedDiscounts;
        public List<DriverReceipt> driverReceipts;
        public decimal sumDriverCost;
        public List<VehicleReceipt> vehicleReceipts;
        public decimal sumVehicleCost;
        public Quote quote;

        public QuoteReceipt(Quote quote)
        {
            this.quote = quote;
            quoteAppliedDiscounts = new Dictionary<string, decimal>();
            driverReceipts = new List<DriverReceipt>();
            vehicleReceipts = new List<VehicleReceipt>();
        }
    }
}
