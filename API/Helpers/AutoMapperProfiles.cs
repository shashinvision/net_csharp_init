﻿using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDTO>()
            .ForMember(d => d.age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge())) // You could also use DateTimeExtensions.CalculateAge(s.DateOfBirth)
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain)!.Url));
            
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>(); // <source, destination>
    }
}
