using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=adaptivequiz.db"));
builder.Services.AddScoped<QuizService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Users.Any())
    {
        db.Users.Add(new User
        {
            Email = "test@test.com",
            Role = "User",
            CurrentLevel = 1
        });

        db.SaveChanges();
    }

    if (!db.Questions.Any())
    {
        var questions = new List<Question>
    {
        // Difficulty 1
        new Question
        {
            Text = "What is the capital of the UK?",
            Difficulty = 1,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "London", "Paris", "Madrid", "Lisbon" },
                CorrectAnswer = "London"
            })
        },
        new Question
        {
            Text = "What color is the sky?",
            Difficulty = 1,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "Blue", "Green", "Red", "Yellow" },
                CorrectAnswer = "Blue"
            })
        },
        new Question
        {
            Text = "How many days are in a week?",
            Difficulty = 1,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "5", "6", "7", "8" },
                CorrectAnswer = "7"
            })
        },

        // Difficulty 2
        new Question
        {
            Text = "Which planet is known as the Red Planet?",
            Difficulty = 2,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "Mars", "Venus", "Jupiter", "Saturn" },
                CorrectAnswer = "Mars"
            })
        },
        new Question
        {
            Text = "Who wrote 'Romeo and Juliet'?",
            Difficulty = 2,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "Shakespeare", "Dickens", "Austen", "Orwell" },
                CorrectAnswer = "Shakespeare"
            })
        },
        new Question
        {
            Text = "What is 12 x 12?",
            Difficulty = 2,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "124", "144", "132", "154" },
                CorrectAnswer = "144"
            })
        },

        // Difficulty 3
        new Question
        {
            Text = "What is the square root of 144?",
            Difficulty = 3,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "10", "11", "12", "13" },
                CorrectAnswer = "12"
            })
        },
        new Question
        {
            Text = "Which gas do plants absorb from the atmosphere?",
            Difficulty = 3,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen" },
                CorrectAnswer = "Carbon Dioxide"
            })
        },
        new Question
        {
            Text = "Who developed the theory of relativity?",
            Difficulty = 3,
            Type = "MCQ",
            Data = JsonSerializer.Serialize(new QuestionData
            {
                Options = new List<string> { "Newton", "Einstein", "Tesla", "Galileo" },
                CorrectAnswer = "Einstein"
            })
        }
    };

        db.Questions.AddRange(questions);
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
