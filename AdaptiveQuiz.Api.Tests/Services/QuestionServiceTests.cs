using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Tests.TestHelpers;
using FluentAssertions;

namespace AdaptiveQuiz.Api.Tests.Services
{
    public class QuestionServiceTests
    {

        [Fact]
        public async Task CreateQuestionAsync_ShouldCreateQuestion()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var questionService = new QuestionService(context);

            var request = new CreateQuestionRequest
            {
                Text = "Capital of France",
                Difficulty = 5,
                Category = "Geography",
                Type = "MultipleChoice",
                Options = new() { "London", "Paris", "Berlin" },
                CorrectAnswer = "Paris"
            };

            // Act
            var result = await questionService.CreateQuestionAsync(request);

            // Assert
            result.Text.Should().Be(request.Text);
            result.Difficulty.Should().Be(request.Difficulty);
            result.Category.Should().Be(request.Category);
            result.Type.Should().Be(request.Type);

            context.Questions.Should().ContainSingle();
        }

        [Fact]
        public async Task GetQuestionByIdAsync_ShouldReturnQuestion()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var question = new Question
            {
                Text = "Question 1",
                Difficulty = 3,
                Category = "General",
                Type = "MultipleChoice",
                Data = "{}"
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var questionService = new QuestionService(context);

            // Act
            var result = await questionService.GetQuestionByIdAsync(question.Id);

            // Assert
            result.Should().NotBeNull();
            result!.Id.Should().Be(question.Id);
            result.Text.Should().Be("Question 1");
        }

        [Fact]
        public async Task UpdateQuestionAsync_ShouldUpdateQuestion()
        {
            // Arrange
            var context = TestDbContextFactory.Create();

            var question = new Question
            {
                Text = "Old Question",
                Difficulty = 2,
                Category = "Old",
                Type = "MultipleChoice",
                Data = "{}"
            };

            context.Questions.Add(question);
            await context.SaveChangesAsync();

            var questionService = new QuestionService(context);

            var request = new CreateQuestionRequest
            {
                Text = "New Question",
                Difficulty = 7,
                Category = "Science",
                Type = "MultipleChoice",
                Options = new() { "A", "B", "C" },
                CorrectAnswer = "B"
            };

            // Act
            var result = await questionService.UpdateQuestionAsync(question.Id, request);

            // Assert
            result.Should().NotBeNull();
            result!.Text.Should().Be("New Question");
            result.Difficulty.Should().Be(7);
            result.Category.Should().Be("Science");
        }

    }
}
