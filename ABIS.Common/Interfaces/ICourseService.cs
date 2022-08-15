using ABIS.Common.DTOs.CourseDTOs;

namespace ABIS.Common.Interfaces
{
    public interface ICourseService
    {
        Task GetCourseById(int id);
        Task<ICollection<GetCourseDTO>> GetCoursesAsync(bool isSuperAdmin = false);
        Task CreateCourseAsync(CreateCourseDTO courseDTO);
        Task ChangeCourseStatus(int id);
        Task UpdateCourseAsync(UpdateCourseDTO courseDTO);
    }
}
