namespace ABIS.Common.Entities;

public class Progress
{
    public int Id { get; set; }
    public int StructuralUnitId { get; set; }
    public StructuralUnit StructuralUnit { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public int CourseId { get; set; }
    public Course Course { get; set; }
}