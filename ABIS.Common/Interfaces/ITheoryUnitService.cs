
using ABIS.Common.DTOs.TheoryUnitDTOs;
using ABIS.Common.Enums;

namespace ABIS.Common.Interfaces
{
    public interface ITheoryUnitService
    {
        Task CreateTheoryUnitAsync(CreateTheoryUnitDTO createTheoryUnitDTO);
        Task UpdateTheoryUnitAsync(UpdateTheoryUnitDTO updateTheoryUnitDTO);
        Task<GetTheoruUnitByIdDTO> GetTheoryUnitByIdAsync(int id, Roles role);
    }
}
