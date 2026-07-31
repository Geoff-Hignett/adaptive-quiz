using AdaptiveQuiz.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace AdaptiveQuiz.Api.Tests.TestHelpers;

public static class TestDbContextFactory
{
    public static AppDbContext Create()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}