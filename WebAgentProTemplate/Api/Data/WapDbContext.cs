using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAgentPro.Api.Models;
using WebAgentProTemplate.Api.Models;

namespace WebAgentPro.Data
{
  public class WapDbContext : IdentityDbContext<User>
  {
    public WapDbContext(DbContextOptions<WapDbContext> options)
         : base(options)
    {
    }

        public DbSet<Widget> Widgets { get; set; }
        public DbSet<WidgetPart> WidgetParts { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

    }
}
