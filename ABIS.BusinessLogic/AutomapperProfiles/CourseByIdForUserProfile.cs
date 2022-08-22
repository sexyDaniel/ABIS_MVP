using ABIS.Common.DTOs.CommonDTOs;
using ABIS.Common.DTOs.CourseDTOs;
using ABIS.Common.Entities;
using AutoMapper;

namespace ABIS.BusinessLogic.AutomapperProfiles
{
    public class CourseByIdForUserProfile : Profile
    {
        public CourseByIdForUserProfile()
        {

            CreateMap<Course, GetCourseByIdForUser>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(c => c.Title))
            .ForMember(
                dto => dto.CourseId,
                opt => opt.MapFrom(c => c.Id))
            .ForMember(
                dto => dto.Description,
                opt => opt.MapFrom(c => c.Discription))
            .ForMember(
                dto => dto.Image,
                opt => opt.MapFrom(c => c.Image))
            .ForMember(
                dto => dto.Status,
                opt => opt.MapFrom(c => c.CourseStatus))
            .ForMember(
                dto => dto.SubItems,
                opt => opt.MapFrom(c => c.CourseSubItem.OrderBy(u => u.Number)));
        }
    }

    public class SubItemForUserProfile : Profile
    {
        public SubItemForUserProfile()
        {
            CreateMap<CourseSubItem, SubItemForUserDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(s => s.Title))
            .ForMember(
                dto => dto.Id,
                opt => opt.MapFrom(s => s.Id))
             .ForMember(
                dto => dto.Description,
                opt => opt.MapFrom(c => c.Discription))
            .ForMember(
                dto => dto.Units,
                opt => opt.MapFrom(c => c.StructuralUnits.OrderBy(u => u.Number)));
        }
    }

    public class UnitForUserDTOProfile : Profile
    {
        public UnitForUserDTOProfile()
        {
            CreateMap<StructuralUnit, UnitForUserDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(s => s.Title))
            .ForMember(
                dto => dto.Id,
                opt => opt.MapFrom(s => s.Id))
            .ForMember(
                dto => dto.IsComplete,
                opt => opt.MapFrom(s => s.Progresses.Any()))
            .ForMember(
                dto => dto.Type,
                opt => opt.MapFrom(s => s is TheoryUnit ? "Theory" : "Test"));
        }
    }
}
