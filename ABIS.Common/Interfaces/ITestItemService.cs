
using ABIS.Common.DTOs.TestItemDTOs;

namespace ABIS.Common.Interfaces
{
    public interface ITestItemService
    {
        Task<AnswerForCreateDTO> CreateTestItemAsync(CreateTestItemDTO testItemDTO);
        Task<AnswerForCreateDTO> CreateRatioTestItemAsync(CreateRatioTestitemDTO ratioTestitemDTO);
        Task DeleteTestItemAsync(int testItemId);
        Task UpdateTestItemAsync(UpdateTestItemDTO updateTestItem);
        Task<ICollection<GetTestItemDTO>> GetTestItemsAsync(int testUnitId);
    }
}
