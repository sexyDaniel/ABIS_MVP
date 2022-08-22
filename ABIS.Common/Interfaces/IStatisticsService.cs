using ABIS.Common.DTOs.StatisticDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IStatisticsService
    {
        Task CheckOneAnswerTypeAsync(CheckOneAnswerTypeDTO oneAnswerTypeDTO, Guid? userId);
        Task CheckMultipleAnswerTypeAsync(CheckMultipleAnswerTypeDTO multipleAnswerTypeDTO, Guid? userId);
        Task CheckOpenAnswerTypeAsync(CheckOpenAnswerTypeDTO openAnswerTypeDTO, Guid? userId);
        Task CheckCorrelateAnswerTypeAsync(CheckCorrelateTypeDTO checkCorrelateTypeDTO, Guid? userId);
        Task<GetUnitResultByUser> GetUnitResultByUserAsync(int testUnitId, Guid? userId);
    }
}
