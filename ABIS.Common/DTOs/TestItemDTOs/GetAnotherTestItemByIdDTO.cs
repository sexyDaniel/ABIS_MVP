
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class GetAnotherTestItemByIdDTO : GetTestItemByIdDTO
    {
        public ICollection<AnswerDTO> AnswerDTOs { get; set; }
    }

    public class AnswerDTO 
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
