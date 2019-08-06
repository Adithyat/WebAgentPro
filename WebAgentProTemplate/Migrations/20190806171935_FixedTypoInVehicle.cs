using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class FixedTypoInVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DaytTimeRunningLightsValue",
                table: "Vehicles",
                newName: "DayTimeRunningLightsValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DayTimeRunningLightsValue",
                table: "Vehicles",
                newName: "DaytTimeRunningLightsValue");
        }
    }
}
