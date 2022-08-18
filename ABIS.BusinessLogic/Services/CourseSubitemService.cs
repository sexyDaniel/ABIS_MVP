using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.CourseSubitemDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class CourseSubitemService : ICourseSubitemService
    {
        private readonly IDbContext _context;
        private readonly IMapper _mapper;

        public CourseSubitemService(IDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

            var subItem = new CourseSubItem() 
            {
                Title = createCourseSubitemDTO.Title,
                Discription = createCourseSubitemDTO.Description,
                Number = createCourseSubitemDTO.Number,
                CourseId = createCourseSubitemDTO.CourseId
            };

            await _context.CourseSubItems.AddAsync(subItem);
            await _context.SaveChangesAsync();
        }

        public async Task<GetCourseSubitemByIdDTO> GetCurseSubitemByIdAsync(int id)
        {
            var subItem = await _context.CourseSubItems
                .Include(c => c.StructuralUnits)
                .ProjectTo<GetCourseSubitemByIdDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(c => c.Id == id);

            return subItem;
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
