using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter JWT token"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=adaptivequiz.db"));
builder.Services.AddScoped<QuizService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://kiccvhqmcsyvmbucpstp.supabase.co/auth/v1";
        options.Audience = "authenticated";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = "email"
        };
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Questions.Any())
    {
        var questions = new List<Question>();

        for (int difficulty = 1; difficulty <= 10; difficulty++)
        {
            for (int i = 1; i <= 10; i++)
            {
                questions.Add(new Question
                {
                    Text = $"Difficulty {difficulty} - Question {i}",
                    Difficulty = difficulty,
                    Type = "MCQ",
                    Data = JsonSerializer.Serialize(new QuestionData
                    {
                        Options = new List<string>
                    {
                        $"Option A{difficulty}{i}",
                        $"Option B{difficulty}{i}",
                        $"Option C{difficulty}{i}",
                        $"Option D{difficulty}{i}"
                    },
                        CorrectAnswer = $"Option A{difficulty}{i}"
                    })
                });
            }
        }

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
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
