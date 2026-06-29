using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdaptiveQuiz.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddBugSeverity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Severity",
                table: "BugReports",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Severity",
                table: "BugReports");
        }
    }
}
