using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Tests.TestHelpers;
using FluentAssertions;
using Xunit;

namespace AdaptiveQuiz.Api.Tests.Services;

public class QuizServiceTests
{
    [Fact]
    public async Task StartQuizForUserAsync_ShouldCreateNewQuizAttempt()
    {
        // Arrange
        var context = TestDbContextFactory.Create();

        var userService = new UserService(context);
        var quizService = new QuizService(context, userService);

        var email = "geoff@test.com";

        // Act
        var attempt = await quizService.StartQuizForUserAsync(email);

        // Assert
        attempt.Should().NotBeNull();

        attempt.Score.Should().Be(0);
        attempt.StartingLevel.Should().Be(1);
        attempt.CurrentLevel.Should().Be(1);

        var user = await userService.GetOrCreateUserAsync(email);

        user.LastQuizAt.Should().NotBeNull();

        context.QuizAttempts.Should().ContainSingle();

        context.Users.Should().ContainSingle();
    }
}