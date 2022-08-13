namespace ABIS.Common.Entities;

public class TestUnit : StructuralUnit
{
    public TestUnit()
    {
        TestItems = new HashSet<TestItem>();
    }

    public ICollection<TestItem> TestItems { get; set; }
}