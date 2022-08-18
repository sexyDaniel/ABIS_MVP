using ABIS.Common.DTOs.CourseDTOs;

namespace ABIS.Common.Interfaces
{
    public interface ICourseService
    {
        Task<GetCourseByIdDTO> GetCourseById(int id);
        Task<ICollection<GetCourseDTO>> GetCoursesAsync(bool isSuperAdmin = false);
        Task CreateCourseAsync(CreateCourseDTO courseDTO);
        Task ChangeCourseStatus(int id);
        Task UpdateCourseAsync(UpdateCourseDTO courseDTO);
        Task AddUserToCourse(Guid? userId, int courseId);
        Task<ICollection<GetCourseDTO>> GetUserCourses(Guid? userId);
    }
}
