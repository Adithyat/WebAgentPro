using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentProTemplate.Api.Models
{
    public class Discount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MaxLength(2)]
        public string StateCode { get; set; }
        public decimal DayTimeRunningLights { get; set; }
        public decimal AntiLockBrakes { get; set; }
        public decimal AnnualMileage { get; set; }
        public decimal AntiTheftInstalled { get; set; }
        public decimal DaysDrivenPerWeek { get; set; }
        public decimal MilesDrivenToWork { get; set; }
        public decimal ReduceUseDiscount { get; set; }
        public decimal GarageAddressDifferentFromResidence { get; set; }
        public decimal CustomerLessThanThreeYearsDriving { get; set; }
        public decimal PreviousCarrierPervasiveStateIns { get; set; }
        public decimal PreviousCarrierLizardIns { get; set; }
        public decimal MovingViolationInLastFiveYears { get; set; }
        public decimal ClaimInLastFiveYears { get; set; }
        public decimal MultiCarDiscount { get; set; }
        public decimal DriverLessThanTwentyThree { get; set; }
        public decimal SafeDrivingSchoolAttended { get; set; }
        public decimal PassiveRestraints { get; set; }
    }
}
