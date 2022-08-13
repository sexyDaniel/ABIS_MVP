namespace ABIS.Common.Entities;

public class StructuralUnit
{
    public StructuralUnit()
    {
        Progresses = new HashSet<Progress>();
    }

    public int Id { get; set; }
    public int CourseSubItemId { get; set; }
    public CourseSubItem CourseSubItem { get; set; }
    public int Number { get; set; }
    public string Title { get; set; }

    public ICollection<Progress> Progresses { get; set; }
}