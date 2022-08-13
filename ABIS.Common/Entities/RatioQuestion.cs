namespace ABIS.Common.Entities;

public class RatioQuestion
{
    public int Id { get; set; }
    public int TestItemId { get; set; }
    public TestItem TestItem { get; set; }
    public string QuestionText { get; set; }
    public int RightAnswerId { get; set; }
    public RatioAnswer RatioAnswer { get; set; }
}