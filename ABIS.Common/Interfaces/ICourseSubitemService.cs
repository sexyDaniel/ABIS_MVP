
using ABIS.Common.DTOs.CourseSubitemDTOs;

namespace ABIS.Common.Interfaces
{
    public interface ICourseSubitemService
    {
        Task CreateCurseSubitemAsync(CreateCourseSubitemDTO createCourseSubitemDTO);
        Task GetCurseSubitemByIdAsync(int id);
        Task UpdateCurseSubitemAsync(UpdateCourseSubItemDTO updateCourseSubItemDTO);

    }
}
