namespace ABIS.Common.Entities;

public class TestUnit : StructuralUnit
{
    public TestUnit()
    {
        TestItems = new HashSet<TestItem>();
        Statistics = new HashSet<TestStatistic>();
    }

    public ICollection<TestItem> TestItems { get; set; }
    public ICollection<TestStatistic> Statistics { get; set; }
}