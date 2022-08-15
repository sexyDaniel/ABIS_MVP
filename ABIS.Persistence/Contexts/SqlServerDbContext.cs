using ABIS.Common.Entities;
using ABIS.Common.Interfaces;
using ABIS.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace ABIS.Persistence.Contexts;

public class SqlServerDbContext : DbContext, IDbContext
{
    public SqlServerDbContext(DbContextOptions<SqlServerDbContext> options) : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<CourseSubItem> CourseSubItems { get; set; }
    public DbSet<StructuralUnit> StructuralUnits { get; set; }
    public DbSet<TestUnit> TestUnits { get; set; }
    public DbSet<TheoryUnit> TheoryUnits { get; set; }
    public DbSet<TestItem> TestItems { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<RatioQuestion> RatioQuestions { get; set; }
    public DbSet<RatioAnswer> RatioAnswers { get; set; }
    public DbSet<TestStatistic> TestStatistics { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<Token> Tokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);
    }
}