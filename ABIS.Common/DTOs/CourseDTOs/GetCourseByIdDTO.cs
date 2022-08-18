
using ABIS.Common.DTOs.CommonDTOs;

namespace ABIS.Common.DTOs.CourseDTOs
{
    public class GetCourseByIdDTO
    {
        public string Title { get; set; }
        public int CourseId { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public ICollection<SubItemDTO> SubItems { get; set; }
    }

    public class SubItemDTO 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Number { get; set; }
        public ICollection<UnitDTO> Units { get; set; }
    }
}
