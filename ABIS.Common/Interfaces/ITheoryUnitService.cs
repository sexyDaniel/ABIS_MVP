
using ABIS.Common.DTOs.TheoryUnitDTOs;

namespace ABIS.Common.Interfaces
{
    public interface ITheoryUnitService
    {
        Task CreateTheoryUnitAsync(CreateTheoryUnitDTO createTheoryUnitDTO);
        Task UpdateTheoryUnitAsync(UpdateTheoryUnitDTO updateTheoryUnitDTO);
        Task<GetTheoruUnitByIdDTO> GetTheoryUnitByIdAsync(int id);
    }
}
