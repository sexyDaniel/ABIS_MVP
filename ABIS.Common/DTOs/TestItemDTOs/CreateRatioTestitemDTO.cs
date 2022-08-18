
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateRatioTestitemDTO
    {
        ICollection<RatioQuestion> RatioQuestions { get; set; }
    }

    public class RatioQuestion 
    {
        public string QuestionText { get; set; }
        public string RightAnswerText { get; set; }
    }
}
