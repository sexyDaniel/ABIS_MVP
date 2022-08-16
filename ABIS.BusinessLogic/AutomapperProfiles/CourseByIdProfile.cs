using ABIS.Common.DTOs.CourseDTOs;
using ABIS.Common.Entities;
using AutoMapper;

namespace ABIS.BusinessLogic.AutomapperProfiles
{
    public class CourseByIdProfile : Profile
    {
        public CourseByIdProfile()
        {
            CreateMap<Course, GetCourseByIdDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(c => c.Title))
            .ForMember(
                dto => dto.CourseId,
                opt => opt.MapFrom(c => c.Id))
            .ForMember(
                dto => dto.Discription,
                opt => opt.MapFrom(c => c.Discription))
            .ForMember(
                dto => dto.SubItems,
                opt => opt.MapFrom(c => c.CourseSubItem.OrderBy(u => u.Number)));
        }
    }

    public class SubitemProfile : Profile
    {
        public SubitemProfile()
        {
            CreateMap<CourseSubItem, SubItemDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(s => s.Title))
            .ForMember(
                dto => dto.Id,
                opt => opt.MapFrom(s => s.Id))
            .ForMember(
                dto => dto.Units,
                opt => opt.MapFrom(c => c.StructuralUnits.OrderBy(u=>u.Number)));
        }
    }

    public class UnitProfile : Profile
    {
        public UnitProfile()
        {
            CreateMap<StructuralUnit, UnitDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(s => s.Title))
            .ForMember(
                dto => dto.Id,
                opt => opt.MapFrom(s => s.Id))
            .ForMember(
                dto => dto.Type,
                opt => opt.MapFrom(s => s is TheoryUnit ? "Theory" : "Test"));
        }
    }
}
