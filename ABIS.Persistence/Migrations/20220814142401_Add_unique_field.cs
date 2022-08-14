using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABIS.Persistence.Migrations
{
    public partial class Add_unique_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CourseStatus",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Courses_Title",
                table: "Courses",
                column: "Title",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StructuralUnits_Title",
                table: "StructuralUnits");

            migrationBuilder.DropIndex(
                name: "IX_CourseSubItems_Title",
                table: "CourseSubItems");

            migrationBuilder.DropIndex(
                name: "IX_Courses_Title",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CourseStatus",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Courses");
        }
    }
}
