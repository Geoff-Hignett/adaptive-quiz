using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Requests;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AdaptiveQuiz.Api.Services
{
    public class QuestionService
    {
        private readonly AppDbContext _context;

        public QuestionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Question>> GetAllQuestions()
        {
            return await _context.Questions
                .OrderBy(q => q.Difficulty)
                .ToListAsync();
        }

        public async Task<Question> CreateQuestion(CreateQuestionRequest request)
        {
            var data = new QuestionData
            {
                Options = request.Options,
                CorrectAnswer = request.CorrectAnswer
            };

            var question = new Question
            {
                Text = request.Text,
                Difficulty = request.Difficulty,
                Category = request.Category,
                Type = request.Type,
                Data = JsonSerializer.Serialize(data)
            };

            _context.Questions.Add(question);

            await _context.SaveChangesAsync();

            return question;
        }

        public async Task<Question?> GetQuestionById(int id)
        {
            return await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<Question?> UpdateQuestion(int id, CreateQuestionRequest request)
        {
            var question = await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
                return null;

            var data = new QuestionData
            {
                Options = request.Options,
                CorrectAnswer = request.CorrectAnswer
            };

            question.Text = request.Text;
            question.Difficulty = request.Difficulty;
            question.Category = request.Category;
            question.Type = request.Type;

            question.Data = JsonSerializer.Serialize(data);

            await _context.SaveChangesAsync();

            return question;
        }
    }
}
