using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentProTemplate.Migrations
{
    public partial class AddTempUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TempUserId",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempUserId",
                table: "AspNetUsers");
        }
    }
}
