
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateRatioTestitemDTO : CreateBaseTestItemDTO
    {
        public ICollection<CreateRatioQuestionDTO> RatioQuestions { get; set; }
    }

    public class CreateRatioQuestionDTO 
    {
        public string QuestionText { get; set; }
        public string RightAnswerText { get; set; }
    }
}
