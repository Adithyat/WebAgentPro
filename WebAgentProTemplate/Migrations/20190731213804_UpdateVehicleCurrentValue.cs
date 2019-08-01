using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class UpdateVehicleCurrentValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "CurrentValue",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrentValue",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
