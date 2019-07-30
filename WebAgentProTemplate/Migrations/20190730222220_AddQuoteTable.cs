using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class AddQuoteTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quotes",
                columns: table => new
                {
                    QuoteId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    QuoteStatus = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    SubmittedAt = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: true),
                    Address = table.Column<string>(maxLength: 50, nullable: true),
                    City = table.Column<string>(maxLength: 50, nullable: true),
                    StateCode = table.Column<string>(maxLength: 2, nullable: true),
                    PostalCode = table.Column<string>(maxLength: 15, nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    SSN = table.Column<string>(maxLength: 11, nullable: true),
                    ForceMultiCarDiscount = table.Column<bool>(nullable: false),
                    ForceMultiCarDiscoutValue = table.Column<decimal>(nullable: false),
                    ClaimInLastFiveYears = table.Column<bool>(nullable: false),
                    ClaimInLastFiveYearsValue = table.Column<decimal>(nullable: false),
                    MovingViolationInLastFiveYears = table.Column<bool>(nullable: false),
                    MovingViolationInLastFiveYearsValue = table.Column<decimal>(nullable: false),
                    LessThanThreeYearsDriving = table.Column<bool>(nullable: false),
                    LessThanThreeYearsDrivingValue = table.Column<decimal>(nullable: false),
                    PreviousCarrier = table.Column<int>(nullable: false),
                    PreviousCarrierValue = table.Column<decimal>(nullable: false),
                    TotalSubmittedCost = table.Column<decimal>(nullable: false),
                    DriverSubmittedSubTotal = table.Column<decimal>(nullable: false),
                    VehicleSubmittedSubTotal = table.Column<decimal>(nullable: false),
                    CreatedOnMobile = table.Column<bool>(nullable: false),
                    SubmittedOnMobile = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.QuoteId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Quotes");
        }
    }
}
