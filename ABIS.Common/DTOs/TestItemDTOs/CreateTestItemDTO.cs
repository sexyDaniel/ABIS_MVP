using ABIS.Common.DTOs.AnswerDTOs;
using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateTestItemDTO
    {
        public int TestUnitId { get; set; }
        public string QuestionText { get; set; }
        public TestItemTypes ItemType { get; set; }
        public ICollection<CreateAnswerDTO> AnswerDTOs { get; set; }
    }
}
