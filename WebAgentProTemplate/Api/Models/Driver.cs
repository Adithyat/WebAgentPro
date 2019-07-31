using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentProTemplate.Api.Models
{
    public class Driver
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 DriverId { get; set; }
        [MaxLength(50)]
        public string D_FirstName { get; set; }
        [MaxLength(50)]
        public string D_LastName { get; set; }
        [MaxLength(11)]
        public string D_SSN { get; set; }
        public DateTime D_DateOfBirth { get; set; }
        public decimal UnderAgeOf23DiscountValue { get; set; }
        [MaxLength(50)]
        public string DriverLicenseNumber { get; set; }
        [MaxLength(2)]
        public string DriverLicenseStateCode { get; set; }
        public bool SafeDrivingSchoolAttended { get; set; }
        public decimal SafeDrivingSchoolAttendedValue { get; set; }
        public decimal DriverSubmittedCost { get; set; }

        [ForeignKey("QuoteId")]
        public Quote Quote { get; set; }
        public Int64 QuoteId { get; set; }
    }
}
