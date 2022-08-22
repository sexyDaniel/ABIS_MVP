using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABIS.Persistence.Migrations
{
    public partial class Add_new_fields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestUnitId",
                table: "TestStatistics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TestStatistics_TestUnitId",
                table: "TestStatistics",
                column: "TestUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestStatistics_StructuralUnits_TestUnitId",
                table: "TestStatistics",
                column: "TestUnitId",
                principalTable: "StructuralUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestStatistics_StructuralUnits_TestUnitId",
                table: "TestStatistics");

            migrationBuilder.DropIndex(
                name: "IX_TestStatistics_TestUnitId",
                table: "TestStatistics");

            migrationBuilder.DropColumn(
                name: "TestUnitId",
                table: "TestStatistics");
        }
    }
}
