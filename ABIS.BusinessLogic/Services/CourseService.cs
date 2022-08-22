using ABIS.BusinessLogic.AutomapperProfiles;
using ABIS.BusinessLogic.ValidationRules;
using ABIS.Common.DTOs.CourseDTOs;
using ABIS.Common.Entities;
using ABIS.Common.Enums;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace ABIS.BusinessLogic.Services
{
    public class CourseService : ICourseService
    {
        private readonly IDbContext _context;
        private readonly IMapper _mapper;

        public CourseService(IDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddUserToCourse(Guid? userId, int courseId)
        {
            var course = await _context.Courses
                .Include(c => c.Users)
                .SingleOrDefaultAsync(c => c.Id == courseId);

            if (course == null) 
            {
                throw new NotFoundException("Курс не найден");
            }

            var isUserInCourse = course.Users.Any(u => u.Id == userId);

            if (isUserInCourse)
            {
                throw new BusinessLogicException("Пользователь уже записан на этот курс");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            course.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeCourseStatus(int id)
        {
            var course = await _context.Courses
                .SingleOrDefaultAsync(c => c.Id == id);

            if (course == null) 
            {
                throw new NotFoundException("Курс не найден");
            }

            course.CourseStatus = course.CourseStatus == CourseStatus.Publish ? 
                CourseStatus.Draft : 
                CourseStatus.Publish;

            await _context.SaveChangesAsync();
        }

        public async Task CreateCourseAsync(CreateCourseDTO courseDTO)
        {
            var errors = new CourseValidationRules()
                .CheckTitle(courseDTO.Title)
                .CheckDiscription(courseDTO.Description)
                .GetErrors();

            if (errors.Count > 0) 
            {
                throw new ValidationException(String.Join(' ', errors));
            }

            var isCourseExist = await _context.Courses
                .AnyAsync(c => c.Title == courseDTO.Title);

            if (isCourseExist) 
            {
                throw new BusinessLogicException("Такой курс уже есть");
            }

            var course = new Course()
            {
                Title = courseDTO.Title,
                Image = courseDTO.Image,
                Discription = courseDTO.Description,
            };

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task<GetCourseByIdDTO> GetCourseByIdForSuperAdmin(int id)
        {
            var course = await _context.Courses
                .Include(c => c.CourseSubItem.OrderByDescending(v=>v.Number))
                .ThenInclude(csi => csi.StructuralUnits.OrderBy(v => v.Title))
                .ProjectTo<GetCourseByIdDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(c => c.CourseId == id);

            return course;
        }

        public async Task<GetCourseByIdForUser> GetCourseByIdForUserAsync(int courseId, Guid? userId)
        {
            var course = await _context.Courses
                .Include(c => c.Users)
                .Include(c => c.CourseSubItem)
                .ThenInclude(csi => csi.StructuralUnits)
                .ThenInclude(su => su.Progresses)
                .Select(c => new GetCourseByIdForUser() 
                {
                    CourseId = c.Id,
                    Image = c.Image,
                    IsUserInCourse = c.Users.Any(u => u.Id==userId),
                    Description = c.Discription,
                    Status = c.CourseStatus,
                    Title = c.Title,
                    SubItems = c.CourseSubItem.Select(csi => new SubItemForUserDTO() 
                    {
                        Id = csi.Id,
                        Title = csi.Title,
                        Description = csi.Discription,
                        Units = csi.StructuralUnits.Select(su=>new UnitForUserDTO() 
                        {
                            Id = su.Id,
                            IsComplete = su.Progresses.Any(p => p.UserId == userId),
                            Title = su.Title,
                            Type = su is TheoryUnit ? "Theory" : "Test"
                        }).ToList()
                    }).ToList()
                })
                .SingleOrDefaultAsync(c => c.CourseId == courseId && c.Status == CourseStatus.Publish);

                //.ProjectTo<GetCourseByIdForUser>(_mapper.ConfigurationProvider)
                

            return course;
        }

        public async Task<ICollection<GetCourseDTO>> GetCoursesAsync(bool isSuperAdmin = false)
        {
            var courses = await _context.Courses
                .Where(c => (c.CourseStatus == Common.Enums.CourseStatus.Publish) || (c.CourseStatus == Common.Enums.CourseStatus.Draft && isSuperAdmin))
                .Select(c => new GetCourseDTO()
                {
                    Id = c.Id,
                    Image = c.Image,
                    Title = c.Title,
                    CourseStatus = c.CourseStatus.ToString()
                })
                .ToListAsync();

            return courses;
        }

        public async Task<ICollection<GetCourseDTO>> GetUserCourses(Guid? userId)
        {
            var courses = await _context.Courses
                .Include(c => c.Users)
                .Where(c => c.CourseStatus == Common.Enums.CourseStatus.Publish && c.Users.Any(u => u.Id == userId))
                .Select(c => new GetCourseDTO()
                {
                    Id = c.Id,
                    Image = c.Image,
                    Title = c.Title,
                    CourseStatus = c.CourseStatus.ToString()
                })
                .ToListAsync();

            return courses;
        }

        public async Task UpdateCourseAsync(UpdateCourseDTO courseDTO)
        {
            var course = await _context.Courses
                 .SingleOrDefaultAsync(c => c.Id == courseDTO.Id);

            if (course == null)
            {
                throw new NotFoundException("Курс не найден");
            }

            course.Title = courseDTO.Title;
            course.Discription = courseDTO.Description;
            course.Image = courseDTO.Image;

            await _context.SaveChangesAsync();
        }
    }
}
