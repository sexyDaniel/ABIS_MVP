using ABIS.Common.Enums;

namespace ABIS.Common.Entities;

public class User
{
    public User()
    {
        Courses = new HashSet<Course>();
        TestStatistics = new HashSet<TestStatistic>();
        Progresses = new HashSet<Progress>();
    }

    public Guid Id { get; set; }
    public int CompanyId { get; set; }
    public Company Company { get; set; }
    public Roles Role { get; set; }
    public string PasswordHash{get;set;}
    public string Salt{get;set;}
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public ICollection<Course> Courses { get; set; }
    public ICollection<TestStatistic> TestStatistics { get; set; }
    public ICollection<Progress> Progresses { get; set; }
}