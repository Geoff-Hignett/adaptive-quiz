using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.Exceptions;
using AdaptiveQuiz.Api.Infrastructure;
using AdaptiveQuiz.Api.Responses;
using Microsoft.EntityFrameworkCore;

namespace AdaptiveQuiz.Api.Services
{
    public class BugService
    {
        private readonly AppDbContext _context;

        public BugService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BugReport> CreateBugReport(int userId, CreateBugReportRequest request)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                throw new UserNotFoundException();

            var report = new BugReport
            {
                UserId = userId,
                Title = request.Title,
                Description = request.Description,
                Status = "Open",
                Severity = BugSeverities.Medium,
                CreatedAt = DateTime.UtcNow
            };

            _context.BugReports.Add(report);

            await _context.SaveChangesAsync();

            return report;
        }

        public async Task<List<BugReportResponse>> GetAllBugReports()
        {
            return await _context.BugReports
                .Include(x => x.User)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new BugReportResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Status = x.Status,
                    Severity = x.Severity,
                    CreatedAt = x.CreatedAt,
                    DisplayName = x.User!.DisplayName
                })
                .ToListAsync();
        }

        public async Task<List<BugReport>> GetUserBugReports(int userId)
        {
            return await _context.BugReports
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<BugReport?> UpdateBug(int id, UpdateBugRequest request)
        {
            var bug = await _context.BugReports
                .FirstOrDefaultAsync(x => x.Id == id);

            if (bug == null)
                return null;

            var allowed = new[]
            {
                "Open",
                "In Progress",
                "Resolved",
                "Closed"
            };

            if (!allowed.Contains(request.Status))
                throw new InvalidBugUpdateException("Invalid status");

            if (request.Severity != BugSeverities.Low &&
                request.Severity != BugSeverities.Medium &&
                request.Severity != BugSeverities.High &&
                request.Severity != BugSeverities.Critical)
            {
                throw new InvalidBugUpdateException("Invalid severity");
            }

            bug.Status = request.Status;
            bug.Severity = request.Severity;

            await _context.SaveChangesAsync();

            return bug;
        }

        public async Task<BugComment> AddBugComment(int bugId, int userId, CreateBugCommentRequest request)
        {
            var bug = await _context.BugReports
                .FirstOrDefaultAsync(x => x.Id == bugId);

            if (bug == null)
                throw new BugNotFoundException();

            if (string.IsNullOrWhiteSpace(request.Comment))
                throw new InvalidBugCommentException("Comment is required");

            var comment = new BugComment
            {
                BugReportId = bugId,
                UserId = userId,
                Comment = request.Comment.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            _context.BugComments.Add(comment);

            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<List<BugCommentResponse>> GetBugComments(int bugId)
        {
            return await _context.BugComments
                .Include(x => x.User)
                .Where(x => x.BugReportId == bugId)
                .OrderBy(x => x.CreatedAt)
                .Select(x => new BugCommentResponse
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    CreatedAt = x.CreatedAt,
                    DisplayName = x.User!.DisplayName,
                    Role = x.User.Role
                })
                .ToListAsync();
        }

        public async Task<BugReportResponse?> GetBugReport(int id)
        {
            return await _context.BugReports
                .Include(x => x.User)
                .Where(x => x.Id == id)
                .Select(x => new BugReportResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Status = x.Status,
                    Severity = x.Severity,
                    CreatedAt = x.CreatedAt,
                    DisplayName = x.User!.DisplayName
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UserOwnsBug(int bugId, int userId)
        {
            return await _context.BugReports
                .AnyAsync(x =>
                    x.Id == bugId &&
                    x.UserId == userId);
        }

        public async Task<BugReportResponse?> GetUserBug(int bugId, int userId)
        {
            var bug = await _context.BugReports
                .Where(x =>
                    x.Id == bugId &&
                    x.UserId == userId)
                .Select(x => new BugReportResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Status = x.Status,
                    Severity = x.Severity,
                    CreatedAt = x.CreatedAt,
                    DisplayName = x.User!.DisplayName
                })
                .FirstOrDefaultAsync();

            return bug;
        }
    }
}
