using ABIS.Common.DTOs.AnswerDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IAnswerService
    {
        Task CreateAnswerAsync(CreateSingleAnswerDTO createSingleAnswerDTO);
        Task UpdateAnswerAsync(UpdateAnswerDTO updateAnswerDTO);
        Task DeleteAnswerAsync(int answerId, int testItemId);
    }
}
