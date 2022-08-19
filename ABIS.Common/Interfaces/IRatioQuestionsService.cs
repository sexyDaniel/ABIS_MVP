
using ABIS.Common.DTOs.RatioQuestionDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IRatioQuestionsService
    {
        Task CreateRatioQuestionAsync(CreateRatioQuestion createRatioQuestion);
        Task DeleteRatioQuestionAsync(int testItemId, int ratioQuestionId);
        Task UpdateRatioQuestioAsync(UpdateRatioQuestionDTO updateRatioQuestionDTO);
    }
}
