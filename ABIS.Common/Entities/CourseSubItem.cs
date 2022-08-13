namespace ABIS.Common.Entities;

public class CourseSubItem
{
    public CourseSubItem()
    {
        StructuralUnits = new HashSet<StructuralUnit>();
    }

    public int Id { get; set; }
    public int CourseId { get; set; }
    public Course Course { get; set; }
    public int Number { get; set; }
    public string Title { get; set; }
    public string? Discription { get; set; }

    public ICollection<StructuralUnit> StructuralUnits { get; set; }
}