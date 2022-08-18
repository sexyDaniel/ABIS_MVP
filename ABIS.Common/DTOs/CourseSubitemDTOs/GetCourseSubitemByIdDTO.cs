using ABIS.Common.DTOs.CommonDTOs;

namespace ABIS.Common.DTOs.CourseSubitemDTOs
{
    public class GetCourseSubitemByIdDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Number { get; set; }
        public ICollection<UnitDTO> Units { get; set; }
    }
}
