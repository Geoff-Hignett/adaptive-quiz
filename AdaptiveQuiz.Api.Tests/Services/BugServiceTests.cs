using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.Infrastructure;
using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Tests.TestHelpers;
using FluentAssertions;

namespace AdaptiveQuiz.Api.Tests.Services
{
    public class BugServiceTests
    {

        [Fact]
        public async Task CreateBugReportAsync_ShouldCreateBugReport()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com",
                DisplayName = "Geoff"
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var bugService = new BugService(context);

            var request = new CreateBugReportRequest
            {
                Title = "Login broken",
                Description = "Cannot log in."
            };

            // Act
            var result = await bugService.CreateBugReportAsync(user.Id, request);

            // Assert
            result.Title.Should().Be(request.Title);
            result.Description.Should().Be(request.Description);
            result.Status.Should().Be("Open");
            result.Severity.Should().Be(BugSeverities.Medium);

            context.BugReports.Should().ContainSingle();
        }

        [Fact]
        public async Task UpdateBugAsync_ShouldUpdateStatusAndSeverity()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var bug = new BugReport
            {
                UserId = 1,
                Title = "Bug",
                Description = "Description",
                Status = "Open",
                Severity = BugSeverities.Medium,
                CreatedAt = DateTime.UtcNow
            };

            context.BugReports.Add(bug);
            await context.SaveChangesAsync();

            var bugService = new BugService(context);

            var request = new UpdateBugRequest
            {
                Status = "Resolved",
                Severity = BugSeverities.High
            };

            // Act
            var result = await bugService.UpdateBugAsync(bug.Id, request);

            // Assert
            result.Should().NotBeNull();
            result!.Status.Should().Be("Resolved");
            result.Severity.Should().Be(BugSeverities.High);
        }

        [Fact]
        public async Task AddBugCommentAsync_ShouldAddComment()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var bug = new BugReport
            {
                UserId = 1,
                Title = "Bug",
                Description = "Description",
                Status = "Open",
                Severity = BugSeverities.Medium,
                CreatedAt = DateTime.UtcNow
            };

            context.BugReports.Add(bug);
            await context.SaveChangesAsync();

            var bugService = new BugService(context);

            var request = new CreateBugCommentRequest
            {
                Comment = "Investigating this issue."
            };

            // Act
            var result = await bugService.AddBugCommentAsync(
                bug.Id,
                1,
                request);

            // Assert
            result.Comment.Should().Be("Investigating this issue.");
            result.BugReportId.Should().Be(bug.Id);

            context.BugComments.Should().ContainSingle();
        }

    }
}
