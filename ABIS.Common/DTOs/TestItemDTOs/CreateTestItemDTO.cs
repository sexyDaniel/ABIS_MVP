using ABIS.Common.DTOs.AnswerDTOs;
using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.TestItemDTOs
{
    public class CreateTestItemDTO : CreateBaseTestItemDTO
    {
        public ICollection<CreateAnswerDTO> AnswerDTOs { get; set; }
    }
}
