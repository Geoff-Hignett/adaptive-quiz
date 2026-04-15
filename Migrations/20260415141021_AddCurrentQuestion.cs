using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdaptiveQuiz.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentQuestionId",
                table: "QuizAttempts",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentQuestionId",
                table: "QuizAttempts");
        }
    }
}
