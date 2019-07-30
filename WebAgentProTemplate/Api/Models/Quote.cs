using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentProTemplate.Api.Models
{
    public enum PreviousCarrier
    {
        None = 0,
        Lizard = 1,
        Pervasive = 2
    }
    
    public enum QuoteStatus
    {
        Created = 0,
        Submitted = 1
    }
    public class Quote
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 QuoteId { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }
        public QuoteStatus? QuoteStatus { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? SubmittedAt { get; set; }
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(50)]
        public string Address { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        [MaxLength(2)]
        public string StateCode { get; set; }
        [MaxLength(15)]
        public string PostalCode { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [MaxLength(11)]
        public string SSN { get; set; }
        public bool? ForceMultiCarDiscount { get; set; }
        public decimal? ForceMultiCarDiscoutValue { get; set; }
        public bool? ClaimInLastFiveYears { get; set; }
        public decimal? ClaimInLastFiveYearsValue { get; set; }
        public bool? MovingViolationInLastFiveYears { get; set; }
        public decimal? MovingViolationInLastFiveYearsValue { get; set; }
        public bool? LessThanThreeYearsDriving { get; set; }
        public decimal? LessThanThreeYearsDrivingValue { get; set; }
        public PreviousCarrier? PreviousCarrier { get; set; }
        public decimal? PreviousCarrierValue { get; set; }
        public decimal? TotalSubmittedCost { get; set; }
        public decimal? DriverSubmittedSubTotal { get; set; }
        public decimal? VehicleSubmittedSubTotal { get; set; }
        public bool? CreatedOnMobile { get; set; }
        public bool? SubmittedOnMobile { get; set; }
    }
}
