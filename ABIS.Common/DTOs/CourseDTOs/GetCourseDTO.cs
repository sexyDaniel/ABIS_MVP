using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.CourseDTOs
{
    public class GetCourseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Image { get; set; }
        public string CourseStatus { get; set; }
    }
}
