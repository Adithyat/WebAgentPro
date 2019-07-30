using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class UpdatedWidgetandPartsmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WidgetPartID",
                table: "WidgetParts",
                newName: "ID");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Widgets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Widgets");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "WidgetParts",
                newName: "WidgetPartID");
        }
    }
}
