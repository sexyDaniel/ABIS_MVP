namespace ABIS.Common.Entities;

public class Answer
{
    public int Id { get; set; }
    public int TestItemId { get; set; }
    public TestItem TestItem { get; set; }
    public string AnswerText { get; set; }
    public bool isRight { get; set; } = false;
}