using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class AddDriverVehicleAndUserModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDayOfMonth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BirthMonth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "StateCode",
                table: "Quotes",
                newName: "Q_StateCode");

            migrationBuilder.RenameColumn(
                name: "SSN",
                table: "Quotes",
                newName: "Q_SSN");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Quotes",
                newName: "Q_LastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Quotes",
                newName: "Q_FirstName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Quotes",
                newName: "Q_Email");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Quotes",
                newName: "Q_DateOfBirth");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "U_LastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "U_FirstName");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Quotes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "U_DateOfBirth",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "U_Email",
                table: "AspNetUsers",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "U_StateCode",
                table: "AspNetUsers",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserStatus",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    DriverId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    D_FirstName = table.Column<string>(maxLength: 50, nullable: true),
                    D_LastName = table.Column<string>(maxLength: 50, nullable: true),
                    D_SSN = table.Column<string>(maxLength: 11, nullable: true),
                    D_DateOfBirth = table.Column<DateTime>(nullable: false),
                    DriverLicenseNumber = table.Column<string>(maxLength: 50, nullable: true),
                    DriverLicenseStateCode = table.Column<string>(maxLength: 2, nullable: true),
                    SafeDrivingSchoolAttended = table.Column<bool>(nullable: false),
                    SafeDrivingSchoolAttendedValue = table.Column<decimal>(nullable: false),
                    DriverSubmittedCost = table.Column<decimal>(nullable: false),
                    QuoteId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.DriverId);
                    table.ForeignKey(
                        name: "FK_Drivers_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    VehicleId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Vin = table.Column<string>(maxLength: 17, nullable: true),
                    Make = table.Column<string>(maxLength: 50, nullable: true),
                    Model = table.Column<string>(maxLength: 50, nullable: true),
                    Year = table.Column<string>(maxLength: 4, nullable: true),
                    AnnualMileage = table.Column<int>(nullable: false),
                    AnnualMileageDiscountValue = table.Column<decimal>(nullable: false),
                    DaysDrivenPerWeek = table.Column<int>(nullable: false),
                    DaysDrivenPerWeekDiscountValue = table.Column<decimal>(nullable: false),
                    MilesDrivenToWork = table.Column<int>(nullable: false),
                    MileDrivenToWorkDiscountValue = table.Column<decimal>(nullable: false),
                    AntiLockBrakes = table.Column<bool>(nullable: false),
                    AntiLockBrakesValue = table.Column<decimal>(nullable: false),
                    AntiTheft = table.Column<bool>(nullable: false),
                    AntiTheftValue = table.Column<decimal>(nullable: false),
                    DayTimeRunningLights = table.Column<bool>(nullable: false),
                    DaytTimeRunningLightsValue = table.Column<decimal>(nullable: false),
                    GarageDifferentAddressThanResidence = table.Column<bool>(nullable: false),
                    GarageDifferentAddressThanResidenceValue = table.Column<decimal>(nullable: false),
                    PassiveRestraints = table.Column<bool>(nullable: false),
                    PassiveRestraintsValue = table.Column<decimal>(nullable: false),
                    ReducedUsedDiscount = table.Column<bool>(nullable: false),
                    ReducedUsedDiscountValue = table.Column<decimal>(nullable: false),
                    CurrentValue = table.Column<int>(nullable: false),
                    VehicleSubmittedCost = table.Column<decimal>(nullable: false),
                    DriverId = table.Column<long>(nullable: true),
                    QuoteId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.VehicleId);
                    table.ForeignKey(
                        name: "FK_Vehicles_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "DriverId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_UserId",
                table: "Quotes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_QuoteId",
                table: "Drivers",
                column: "QuoteId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_DriverId",
                table: "Vehicles",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_QuoteId",
                table: "Vehicles",
                column: "QuoteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Quotes_UserId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "U_DateOfBirth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "U_Email",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "U_StateCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserStatus",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Q_StateCode",
                table: "Quotes",
                newName: "StateCode");

            migrationBuilder.RenameColumn(
                name: "Q_SSN",
                table: "Quotes",
                newName: "SSN");

            migrationBuilder.RenameColumn(
                name: "Q_LastName",
                table: "Quotes",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Q_FirstName",
                table: "Quotes",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Q_Email",
                table: "Quotes",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Q_DateOfBirth",
                table: "Quotes",
                newName: "DateOfBirth");

            migrationBuilder.RenameColumn(
                name: "U_LastName",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "U_FirstName",
                table: "AspNetUsers",
                newName: "FirstName");

            migrationBuilder.AddColumn<int>(
                name: "BirthDayOfMonth",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BirthMonth",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }
    }
}
