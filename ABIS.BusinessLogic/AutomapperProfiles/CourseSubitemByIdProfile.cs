using ABIS.Common.DTOs.CourseSubitemDTOs;
using ABIS.Common.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABIS.BusinessLogic.AutomapperProfiles
{
    public class CourseSubitemByIdProfile : Profile
    {
        public CourseSubitemByIdProfile()
        {
            CreateMap<CourseSubItem, GetCourseSubitemByIdDTO>()
            .ForMember(
                dto => dto.Title,
                opt => opt.MapFrom(s => s.Title))
            .ForMember(
                dto => dto.Id,
                opt => opt.MapFrom(s => s.Id))
            .ForMember(
                dto => dto.Description,
                opt => opt.MapFrom(s => s.Discription))
            .ForMember(
                dto => dto.Number,
                opt => opt.MapFrom(s => s.Number))
            .ForMember(
                dto => dto.Units,
                opt => opt.MapFrom(c => c.StructuralUnits.OrderBy(u => u.Number)));
        }
    }
}
