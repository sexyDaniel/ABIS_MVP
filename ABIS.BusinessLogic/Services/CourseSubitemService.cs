using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.CourseSubitemDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class CourseSubitemService : ICourseSubitemService
    {
        private readonly IDbContext _context;

        public CourseSubitemService(IDbContext context)
        {
            _context = context;
        }

        public async Task CreateCurseSubitemAsync(CreateCourseSubitemDTO createCourseSubitemDTO)
        {
            var validationErrors = new CourseSubitemValidationRules()
                .CheckTitle(createCourseSubitemDTO.Title)
                .CheckNumber(createCourseSubitemDTO.Number)
                .GetErrors();
            if (validationErrors.Count > 0) 
            {
                throw new ValidationException(string.Join(" ", validationErrors));
            }

            var isCourseExist = await _context.Courses
                .AnyAsync(c => c.Id == createCourseSubitemDTO.CourseId);
            if (!isCourseExist) 
            {
                throw new NotFoundException("Такого курса нет");
            }

            var isSubItemExist = await _context.CourseSubItems
                .AnyAsync(csi => csi.Title == createCourseSubitemDTO.Title);
            if (isSubItemExist) 
            {
                throw new BusinessLogicException("Подраздел с таким заголовком уже есть");
            }

            var subItem = new CourseSubItem() 
            {
                Title = createCourseSubitemDTO.Title,
                Discription = createCourseSubitemDTO.Discription,
                Number = createCourseSubitemDTO.Number,
                CourseId = createCourseSubitemDTO.CourseId
            };

            await _context.CourseSubItems.AddAsync(subItem);
            await _context.SaveChangesAsync();
        }

        public Task GetCurseSubitemByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateCurseSubitemAsync(UpdateCourseSubItemDTO updateCourseSubItemDTO)
        {
            var validationErrors = new CourseSubitemValidationRules()
               .CheckTitle(updateCourseSubItemDTO.Title)
               .CheckNumber(updateCourseSubItemDTO.Number)
               .GetErrors();
            if (validationErrors.Count > 0)
            {
                throw new ValidationException(string.Join(" ", validationErrors));
            }

            var subItem = await _context.CourseSubItems
                .SingleOrDefaultAsync(si => si.Id == updateCourseSubItemDTO.Id);

            if (subItem == null) 
            {
                throw new NotFoundException("Такого подпункта нет");
            }

            subItem.Number = updateCourseSubItemDTO.Number;
            subItem.Discription = updateCourseSubItemDTO.Description;
            subItem.Title = updateCourseSubItemDTO.Title;

            await _context.SaveChangesAsync();
        }
    }
}
