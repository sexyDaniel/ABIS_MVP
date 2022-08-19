
namespace ABIS.Common.DTOs.RatioQuestionDTOs
{
    public class UpdateRatioQuestionDTO
    {
        public int RatioQuestionId { get; set; }
        public int TestItemId { get; set; }
        public string QuestionText { get; set; }
        public string AnswerText { get; set; }
    }
}
