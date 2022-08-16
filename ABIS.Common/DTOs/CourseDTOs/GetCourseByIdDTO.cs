
namespace ABIS.Common.DTOs.CourseDTOs
{
    public class GetCourseByIdDTO
    {
        public string Title { get; set; }
        public int CourseId { get; set; }
        public string Discription { get; set; }
        public ICollection<SubItemDTO> SubItems { get; set; }
    }

    public class SubItemDTO 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<UnitDTO> Units { get; set; }
    }

    public class UnitDTO 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
    }
}
