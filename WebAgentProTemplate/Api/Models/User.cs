using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAgentPro.Api.Models
{
    public class User : IdentityUser
    {
        [MaxLength(50)]
        public string U_Email { get; set; }
        public string U_FirstName { get; set; }
        public string U_LastName { get; set; }
        public int Role { get; set; }
        public DateTime U_DateOfBirth { get; set; }
        [MaxLength(2)]
        public string U_StateCode { get; set; }
        public UserStatus UserStatus { get; set; }
    }

    public enum Role
    {
        Agent = 0,
        Manager = 1
    }

    public enum UserStatus
    {
        Pending = 0,
        Active = 1
    }
}
