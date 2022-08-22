
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class GetRatioTestItemByIdDTO : GetTestItemByIdDTO
    {
        public ICollection<RatioQuestionDTO> RatioQuestions { get; set; }
        public ICollection<RatioAnswerDTO> RatioAnswers { get; set; }
    }

    public class RatioQuestionDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
    }

    public class RatioAnswerDTO
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
    }
}
