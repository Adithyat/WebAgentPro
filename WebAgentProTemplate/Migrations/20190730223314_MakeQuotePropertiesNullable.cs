using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class MakeQuotePropertiesNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "VehicleSubmittedSubTotal",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalSubmittedCost",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<bool>(
                name: "SubmittedOnMobile",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<int>(
                name: "QuoteStatus",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "PreviousCarrierValue",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<int>(
                name: "PreviousCarrier",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "MovingViolationInLastFiveYearsValue",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<bool>(
                name: "MovingViolationInLastFiveYears",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<decimal>(
                name: "LessThanThreeYearsDrivingValue",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<bool>(
                name: "LessThanThreeYearsDriving",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<decimal>(
                name: "ForceMultiCarDiscoutValue",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<bool>(
                name: "ForceMultiCarDiscount",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<decimal>(
                name: "DriverSubmittedSubTotal",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<bool>(
                name: "CreatedOnMobile",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<decimal>(
                name: "ClaimInLastFiveYearsValue",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<bool>(
                name: "ClaimInLastFiveYears",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "VehicleSubmittedSubTotal",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalSubmittedCost",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "SubmittedOnMobile",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "QuoteStatus",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "PreviousCarrierValue",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PreviousCarrier",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "MovingViolationInLastFiveYearsValue",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "MovingViolationInLastFiveYears",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "LessThanThreeYearsDrivingValue",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "LessThanThreeYearsDriving",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ForceMultiCarDiscoutValue",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "ForceMultiCarDiscount",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "DriverSubmittedSubTotal",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "CreatedOnMobile",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ClaimInLastFiveYearsValue",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "ClaimInLastFiveYears",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
