using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABIS.Persistence.Migrations
{
    public partial class Change_title_unique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StructuralUnits_Title",
                table: "StructuralUnits");

            migrationBuilder.DropIndex(
                name: "IX_CourseSubItems_Title",
                table: "CourseSubItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_StructuralUnits_Title",
                table: "StructuralUnits",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubItems_Title",
                table: "CourseSubItems",
                column: "Title",
                unique: true);
        }
    }
}
