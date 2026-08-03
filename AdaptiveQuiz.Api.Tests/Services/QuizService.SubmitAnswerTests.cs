using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Tests.TestHelpers;
using FluentAssertions;

namespace AdaptiveQuiz.Api.Tests.Services
{
    public class QuizServiceSubmitAnswerTests
    {
        [Fact]
        public async Task SubmitAnswerAsync_ShouldAwardPointsAndIncreaseLevel_WhenAnswerIsCorrect()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com",
                CurrentLevel = 5
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var question = new Question
            {
                Text = "Capital of France",
                Difficulty = 5,
                Category = "General",
                Type = "MultipleChoice",
                Data = """
                    {
                        "options":["London","Paris","Berlin"],
                        "correctAnswer":"Paris"
                    }
                    """
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 5,
                StartingLevel = 5,
                StartedAt = DateTime.UtcNow,
                CurrentQuestionId = question.Id
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            var request = new SubmitAnswerRequest
            {
                AttemptId = attempt.Id,
                QuestionId = question.Id,
                Answer = "Paris",
                TimeTakenMs = 1000
            };

            // Act
            var result = await quizService.SubmitAnswerAsync(request, user.Id);

            // Assert
            result.Correct.Should().BeTrue();
            result.TotalPoints.Should().BeGreaterThan(0);
            result.NewLevel.Should().Be(6);

            var savedAttempt = await context.QuizAttempts.FindAsync(attempt.Id);
            savedAttempt!.Score.Should().Be(result.TotalPoints);
        }

        [Fact]
        public async Task SubmitAnswerAsync_ShouldAwardZeroPointsAndDecreaseLevel_WhenAnswerIsIncorrect()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com",
                CurrentLevel = 5
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var question = new Question
            {
                Text = "Capital of France",
                Difficulty = 5,
                Category = "General",
                Type = "MultipleChoice",
                Data = """
                {
                    "options":["London","Paris","Berlin"],
                    "correctAnswer":"Paris"
                }
                """
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 5,
                StartingLevel = 5,
                StartedAt = DateTime.UtcNow,
                CurrentQuestionId = question.Id
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            var request = new SubmitAnswerRequest
            {
                AttemptId = attempt.Id,
                QuestionId = question.Id,
                Answer = "London",
                TimeTakenMs = 1000
            };

            // Act
            var result = await quizService.SubmitAnswerAsync(request, user.Id);

            // Assert
            result.Correct.Should().BeFalse();
            result.TotalPoints.Should().Be(0);
            result.NewLevel.Should().Be(4);

            var savedAttempt = await context.QuizAttempts.FindAsync(attempt.Id);
            savedAttempt!.Score.Should().Be(0);
        }

        [Fact]
        public async Task SubmitAnswerAsync_ShouldCompleteQuiz_WhenThirdQuestionIsAnswered()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var user = new User
            {
                Email = "geoff@test.com",
                CurrentLevel = 5
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var question = new Question
            {
                Text = "Capital of France",
                Difficulty = 5,
                Category = "General",
                Type = "MultipleChoice",
                Data = """
                {
                    "options":["London","Paris","Berlin"],
                    "correctAnswer":"Paris"
                }
                """
                    };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var attempt = new QuizAttempt
            {
                UserId = user.Id,
                CurrentLevel = 5,
                StartingLevel = 5,
                StartedAt = DateTime.UtcNow,
                CurrentQuestionId = question.Id
            };

            context.QuizAttempts.Add(attempt);
            await context.SaveChangesAsync();

            context.QuizAttemptQuestions.AddRange(
                new QuizAttemptQuestion
                {
                    QuizAttemptId = attempt.Id,
                    QuestionId = question.Id
                },
                new QuizAttemptQuestion
                {
                    QuizAttemptId = attempt.Id,
                    QuestionId = question.Id
                });

            await context.SaveChangesAsync();

            var userService = new UserService(context);
            var quizService = new QuizService(context, userService);

            var request = new SubmitAnswerRequest
            {
                AttemptId = attempt.Id,
                QuestionId = question.Id,
                Answer = "Paris",
                TimeTakenMs = 1000
            };

            // Act
            var result = await quizService.SubmitAnswerAsync(request, user.Id);

            // Assert
            result.IsComplete.Should().BeTrue();

            var savedAttempt = await context.QuizAttempts.FindAsync(attempt.Id);
            savedAttempt!.CompletedAt.Should().NotBeNull();
        }
    }
}
