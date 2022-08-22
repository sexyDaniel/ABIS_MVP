namespace ABIS.Common.Entities;

public class TestStatistic
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public int TestUnitId { get; set; }
    public TestUnit TestUnit { get; set; }
    public int TestItemId { get; set; }
    public TestItem TestItem { get; set; }
    public bool IsRight { get; set; } = false;
    public DateTime CreateDate { get; set; } = DateTime.UtcNow;
}