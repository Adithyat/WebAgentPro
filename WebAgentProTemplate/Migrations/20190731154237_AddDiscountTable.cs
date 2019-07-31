using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class AddDiscountTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    StateCode = table.Column<string>(maxLength: 2, nullable: false),
                    DayTimeRunningLights = table.Column<decimal>(nullable: false),
                    AntiLockBrakes = table.Column<decimal>(nullable: false),
                    AnnualMileage = table.Column<decimal>(nullable: false),
                    AntiTheftInstalled = table.Column<decimal>(nullable: false),
                    DaysDrivenPerWeek = table.Column<decimal>(nullable: false),
                    MilesDrivenToWork = table.Column<decimal>(nullable: false),
                    ReduceUseDiscount = table.Column<decimal>(nullable: false),
                    GarageAddressDifferentFromResidence = table.Column<decimal>(nullable: false),
                    CustomerLessThanThreeYearsDriving = table.Column<decimal>(nullable: false),
                    PreviousCarrierPervasiveStateIns = table.Column<decimal>(nullable: false),
                    PreviousCarrierLizardIns = table.Column<decimal>(nullable: false),
                    MovingViolationInLastFiveYears = table.Column<decimal>(nullable: false),
                    ClaimInLastFiveYears = table.Column<decimal>(nullable: false),
                    MultiCarDiscount = table.Column<decimal>(nullable: false),
                    DriverLessThanTwentyThree = table.Column<decimal>(nullable: false),
                    SafeDrivingSchoolAttended = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.StateCode);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Discounts");
        }
    }
}
