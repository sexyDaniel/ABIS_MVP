using ABIS.Common.DTOs.TestUnitsDTOs;

namespace ABIS.Common.Interfaces;

public interface ITestUnitService
{
    Task CreateTestUnit(CreateTestUnitDTO createTestUnitDTO);
    Task UpdateTestUnit(UpdateTestUnitDTO updateTestUnitDTO);
    Task<GetTestUnitByIdDTO> GetTestUnitById(int id);
}

