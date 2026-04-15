using AdaptiveQuiz.Api.Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AdaptiveQuiz.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<QuizQuestion> QuizQuestions => Set<QuizQuestion>();
    public DbSet<UserQuestionHistory> UserQuestionHistories => Set<UserQuestionHistory>();
}