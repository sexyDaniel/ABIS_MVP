
using ABIS.Common.Entities;
using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.CourseDTOs
{
    public class GetCourseByIdForUser
    {
        public string Title { get; set; }
        public bool IsUserInCourse { get; set; }
        public int CourseId { get; set; }
        public CourseStatus Status { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public ICollection<SubItemForUserDTO> SubItems { get; set; }
    }

    public class SubItemForUserDTO 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<UnitForUserDTO> Units { get; set; }
    }

    public class UnitForUserDTO 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public bool IsComplete { get; set; } 
    }
}
