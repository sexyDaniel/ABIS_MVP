using ABIS.Common.Enums;

namespace ABIS.Common.Entities;

public class TestItem
{
    public TestItem()
    {
        Answers = new List<Answer>();
        RatioQuestions = new HashSet<RatioQuestion>();
        RatioAnswers = new HashSet<RatioAnswer>();
        TestStatistics = new HashSet<TestStatistic>();
    }
    
    public int Id { get; set; }
    public int TestUnitId { get; set; }
    public TestUnit TestUnit { get; set; }
    public int Number { get; set; }
    public string QuestionText { get; set; }
    public TestItemTypes ItemType { get; set; }

    public List<Answer> Answers { get; set; }
    public ICollection<RatioQuestion> RatioQuestions { get; set; }
    public ICollection<RatioAnswer> RatioAnswers { get; set; }
    public ICollection<TestStatistic> TestStatistics { get; set; }
}