
namespace ABIS.Common.DTOs.StatisticDTOs
{
    public class CheckCorrelateTypeDTO
    {
        public int TestUnitId { get; set; }
        public int TestItemId { get; set; }
        public ICollection<CheckRatioQuestionDTO> Answers { get; set; }
    }

    public class CheckRatioQuestionDTO 
    {
        public int RatioQuestionId { get; set; }
        public int RatioAnswerId { get; set; }
    }
}
