using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.TestUnitsDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class TestUnitService : ITestUnitService
    {
        private readonly IDbContext _context;
        public TestUnitService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateTestUnit(CreateTestUnitDTO createTestUnitDTO)
        {
            var validationErrors = new StructuralUnitValidationRules()
                .CheckTitle(createTestUnitDTO.Title)
                .CheckNumber(createTestUnitDTO.Number)
                .GetErrors();

            if (validationErrors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var isSubItemExist = await _context.CourseSubItems
                .AnyAsync(csi => csi.Id == createTestUnitDTO.CourseSubItemId);

            if (!isSubItemExist)
            {
                throw new NotFoundException("Такого пункта нет");
            }

            var isUnitExists = await _context.StructuralUnits
                .AnyAsync(su => su.Title == createTestUnitDTO.Title);

            if (isUnitExists)
            {
                throw new BusinessLogicException("Такой заголовок уже есть");
            }

            var test = new TestUnit()
            {
                Number = createTestUnitDTO.Number,
                CourseSubItemId = createTestUnitDTO.CourseSubItemId,
                Title = createTestUnitDTO.Title,
            };

            await _context.TestUnits.AddAsync(test);
            await _context.SaveChangesAsync();
        }

        public Task GetTestUnitById()
        {
            throw new NotImplementedException();
        }

        public Task UpdateTestUnit(UpdateTestUnitDTO updateTestUnitDTO)
        {
            throw new NotImplementedException();
        }
    }
}
