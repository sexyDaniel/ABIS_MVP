namespace ABIS.Common.Entities;

public class RatioAnswer
{
    public int Id { get; set; }
    public int TestItemId { get; set; }
    public TestItem TestItem { get; set; }
    public string AnswerText { get; set; }
    public RatioQuestion RatioQuestion { get; set; }
}