using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Exceptions;
using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Tests.TestHelpers;
using FluentAssertions;

namespace AdaptiveQuiz.Api.Tests.Services
{
    public class QuizServiceGetNextQuestionTests
    {
        [Fact]
        public async Task GetNextQuestionAsync_ShouldReturnCurrentQuestion_WhenOneIsAlreadyActive()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com"
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var question = new Question
            {
                Text = "Existing question",
                Difficulty = 1,
                Category = "General",
                Type = "MultipleChoice",
                Data = "{}"
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 1,
                StartingLevel = 1,
                StartedAt = DateTime.UtcNow,
                CurrentQuestionId = question.Id
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            // Act
            var result = await quizService.GetNextQuestionAsync(attempt.Id, user.Id);

            // Assert
            result.Id.Should().Be(question.Id);
            result.Text.Should().Be(question.Text);

            context.Questions.Should().ContainSingle();
        }

        [Fact]
        public async Task GetNextQuestionAsync_ShouldThrow_WhenNoQuestionsAvailable()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com"
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 5,
                StartingLevel = 5,
                StartedAt = DateTime.UtcNow
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            // Act
            Func<Task> act = () => quizService.GetNextQuestionAsync(attempt.Id, user.Id);

            // Assert
            await act.Should()
                .ThrowAsync<NoQuestionsAvailableException>();
        }

        [Fact]
        public async Task GetNextQuestionAsync_ShouldAssignAndReturnNewQuestion()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com"
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var question = new Question
            {
                Text = "Question 1",
                Difficulty = 5,
                Category = "General",
                Type = "MultipleChoice",
                Data = "{}"
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 5,
                StartingLevel = 5,
                StartedAt = DateTime.UtcNow
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            // Act
            var result = await quizService.GetNextQuestionAsync(attempt.Id, user.Id);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(question.Id);

            var savedAttempt = await context.QuizAttempts.FindAsync(attempt.Id);

            savedAttempt!.CurrentQuestionId.Should().Be(question.Id);

            Math.Abs(result.Difficulty - attempt.CurrentLevel)
                .Should()
                .BeLessThanOrEqualTo(1);
        }
    }
}
