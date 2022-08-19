
namespace ABIS.Common.DTOs.AnswerDTOs
{
    public class UpdateAnswerDTO
    {
        public int AnswerId { get; set; }
        public int TestItemId { get; set; }
        public string AnswerText { get; set; }
        public bool IsRight { get; set; }
    }
}
