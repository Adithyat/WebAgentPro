using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentProTemplate.Api.Models
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 VehicleId { get; set; }
        [MaxLength(17)]
        public string Vin { get; set; }
        [MaxLength(50)]
        public string Make { get; set; }
        [MaxLength(50)]
        public string Model { get; set; }
        [MaxLength(4)]
        public string Year { get; set; }
        [Range(0, int.MaxValue)]
        public int AnnualMileage { get; set; }
        public decimal AnnualMileageDiscountValue { get; set; }
        [Range(0, int.MaxValue)]
        public int DaysDrivenPerWeek { get; set; }
        public decimal DaysDrivenPerWeekDiscountValue { get; set; }
        [Range(0, int.MaxValue)]
        public int MilesDrivenToWork { get; set; }
        public decimal MileDrivenToWorkDiscountValue { get; set; }
        public bool AntiLockBrakes { get; set; }
        public decimal AntiLockBrakesValue { get; set; }
        public bool AntiTheft { get; set; }
        public decimal AntiTheftValue { get; set; }
        public bool DayTimeRunningLights { get; set; }
        public decimal DaytTimeRunningLightsValue { get; set; }
        public bool GarageDifferentAddressThanResidence { get; set; }
        public decimal GarageDifferentAddressThanResidenceValue { get; set; }
        public bool PassiveRestraints { get; set; }
        public decimal PassiveRestraintsValue { get; set; }
        public bool ReducedUsedDiscount { get; set; }
        public decimal ReducedUsedDiscountValue { get; set; }
        [Range(0, int.MaxValue)]
        public int CurrentValue { get; set; }
        public decimal VehicleSubmittedCost { get; set; }

        [ForeignKey("DriverId")]
        public Driver Driver { get; set; }
        public Int64? DriverId { get; set; }

        [ForeignKey("QuoteId")]
        public Quote Quote { get; set; }
        public Int64 QuoteId { get; set; }
    }
}
