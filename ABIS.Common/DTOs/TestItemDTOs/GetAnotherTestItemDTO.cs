
namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class GetAnotherTestItemDTO : GetTestItemDTO
    {
        public ICollection<GetAnswerDTO> Answers { get; set; }
    }

    public class GetAnswerDTO 
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsRight { get; set; }
    }
}
