namespace ABIS.Common.DTOs.AnswerDTOs
{
    public class CreateSingleAnswerDTO
    {
        public int TestItemId { get; set; }
        public string AnswerText { get; set; }
        public bool isRight { get; set; } = false;
    }
}
