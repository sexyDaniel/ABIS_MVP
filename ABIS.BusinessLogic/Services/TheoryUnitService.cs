using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.TheoryUnitDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class TheoryUnitService : ITheoryUnitService
    {
        private readonly IDbContext _context;

        public TheoryUnitService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateTheoryUnitAsync(CreateTheoryUnitDTO createTheoryUnitDTO)
        {
            var validationErrors = new StructuralUnitValidationRules()
                .CheckTitle(createTheoryUnitDTO.Title)
                .CheckNumber(createTheoryUnitDTO.Number)
                .GetErrors();

            if (validationErrors.Count > 0) 
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var isSubItemExist = await _context.CourseSubItems
                .AnyAsync(csi => csi.Id == createTheoryUnitDTO.CourseSubItemId);

            if (!isSubItemExist) 
            {
                throw new NotFoundException("Такого пункта нет");
            }

            var theory = new TheoryUnit() 
            {
                Body = createTheoryUnitDTO.Body,
                Number = createTheoryUnitDTO.Number,
                CourseSubItemId = createTheoryUnitDTO.CourseSubItemId,
                Title = createTheoryUnitDTO.Title,
            };

            await _context.TheoryUnits.AddAsync(theory);
            await _context.SaveChangesAsync();
        }

        public async Task<GetTheoruUnitByIdDTO> GetTheoryUnitByIdAsync(int id, Roles role)
        {
            var theoryUnit = await _context.TheoryUnits
                .Include(tu => tu.CourseSubItem)
                .Where(tu => 
                (tu.CourseSubItem.Course.CourseStatus == CourseStatus.Publish && role != Roles.SuperAdmin) 
                || role == Roles.SuperAdmin)
                .Select(tu => new GetTheoruUnitByIdDTO()
                {
                    Id = tu.Id,
                    Title = tu.Title,
                    CourseSubItemId = tu.CourseSubItemId,
                    Body = tu.Body
                })
                .SingleOrDefaultAsync(tu => tu.Id == id);

            return theoryUnit;
        }

        public async Task UpdateTheoryUnitAsync(UpdateTheoryUnitDTO updateTheoryUnitDTO)
        {
            var validationErrors = new StructuralUnitValidationRules()
                .CheckTitle(updateTheoryUnitDTO.Title)
                .CheckNumber(updateTheoryUnitDTO.Number)
                .GetErrors();

            if (validationErrors.Count > 0)
            {
                throw new ValidationException(string.Join(' ', validationErrors));
            }

            var theoryUnit = await _context.TheoryUnits
                .SingleOrDefaultAsync(tu => tu.Id == updateTheoryUnitDTO.Id);

            if (theoryUnit == null) 
            {
                throw new NotFoundException("Такой теории нет");
            }

            theoryUnit.Number = updateTheoryUnitDTO.Number;
            theoryUnit.Body = updateTheoryUnitDTO.Body;
            theoryUnit.Title = updateTheoryUnitDTO.Title;

            await _context.SaveChangesAsync();
        }
    }
}
