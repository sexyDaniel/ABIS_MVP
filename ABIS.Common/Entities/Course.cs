namespace ABIS.Common.Entities;

public class Course
{
    public Course()
    {
        Users = new HashSet<User>();
        CourseSubItem = new HashSet<CourseSubItem>();
        Progresses = new HashSet<Progress>();
    }

    public int Id { get; set; }
    public string Title { get; set; }
    public string Discription { get; set; }

    public ICollection<User> Users { get; set; }
    public ICollection<CourseSubItem> CourseSubItem { get; set; }
    public ICollection<Progress> Progresses { get; set; }
}