using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Services;
using AdaptiveQuiz.Api.Domain;
using Microsoft.EntityFrameworkCore;

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
        db.Questions.AddRange(
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Who won the 2018 World Cup?", Difficulty = 1, Type = "MCQ", Data = "{}" },
            new Question { Text = "Is Messi Argentinian?", Difficulty = 1, Type = "TrueFalse", Data = "{}" }
        );

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
