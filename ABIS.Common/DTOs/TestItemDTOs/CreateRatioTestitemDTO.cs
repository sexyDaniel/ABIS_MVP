
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateRatioTestitemDTO : CreateBaseTestItemDTO
    {
        public ICollection<RatioQuestionDTO> RatioQuestions { get; set; }
    }

    public class RatioQuestionDTO 
    {
        public string QuestionText { get; set; }
        public string RightAnswerText { get; set; }
    }
}
