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

            var test = new TestUnit()
            {
                Number = createTestUnitDTO.Number,
                CourseSubItemId = createTestUnitDTO.CourseSubItemId,
                Title = createTestUnitDTO.Title,
            };

            await _context.TestUnits.AddAsync(test);
            await _context.SaveChangesAsync();
        }

        public async Task<GetTestUnitByIdDTO> GetTestUnitById(int id)
        {
            var testUnit = await _context.TestUnits
                .Select(tu => new GetTestUnitByIdDTO()
                {
                    Id = tu.Id,
                    Number = tu.Number,
                    Title = tu.Title,
                    CourseSubItemId = tu.CourseSubItemId,
                })
                .SingleOrDefaultAsync(tu => tu.Id == id);

            return testUnit;
        }

        public async Task UpdateTestUnit(UpdateTestUnitDTO updateTestUnitDTO)
        {
            var validationErrors = new StructuralUnitValidationRules()
                .CheckTitle(updateTestUnitDTO.Title)
                .CheckNumber(updateTestUnitDTO.Number)
                .GetErrors();

            if (validationErrors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var isTestUnitExists = await _context.TestUnits
                .AnyAsync(tu => tu.Title == updateTestUnitDTO.Title);

            if (isTestUnitExists)
            {
                throw new NotFoundException("Такой заголовок уже есть");
            }

            var testUnit = await _context.TestUnits
                .SingleOrDefaultAsync(tu => tu.Id == updateTestUnitDTO.Id);

            if (testUnit == null)
            {
                throw new NotFoundException("Такой теории нет");
            }

            testUnit.Number = updateTestUnitDTO.Number;
            testUnit.Title = updateTestUnitDTO.Title;

            await _context.SaveChangesAsync();
        }
    }
}
