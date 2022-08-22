
namespace ABIS.Common.DTOs.StatisticDTOs
{
    public class CheckMultipleAnswerTypeDTO
    {
        public int TestUnitId { get; set; }
        public int TestItemId { get; set; }
        public ICollection<int> Answers { get; set; }
    }
}
