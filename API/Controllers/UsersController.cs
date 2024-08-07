﻿using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// [ApiController]
// [Route("api/[controller]")] // /api/users

[Authorize] // Use when you need authentication, need to be on the top of the controller or on the method
public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseApiController // extend of BaseApiController for reutilizable code
{
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers() // Asyncronous method
    {
        // var users = await context.Users.ToListAsync();
        // return users;

        var users = await userRepository.GetMembersAsync();
        return Ok(users);
    }

    // [Authorize]
    // [HttpGet("{id:int}")] // api/users/3
    // public async Task<ActionResult<AppUser>> GetUser(int id)
    [HttpGet("{username}")] // api/users/3
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        // var user = await context.Users.FindAsync(id);
        var user = await userRepository.GetMemberAsync(username);
        if (user == null) return NotFound();

        
        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto){
        // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        // if(username == null) return BadRequest("No usdername found in token");
        // var user = await userRepository.GetUserByUsernameAsync(username);

        var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());

        if(user == null) return BadRequest("Could not find user");

        mapper.Map(memberUpdateDto, user);

        userRepository.Update(user);

        if(await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file){
        var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());
        if(user == null) return BadRequest("Cannot update user");

        var result = await photoService.AddPhotoAsync(file);
        if(result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        user.Photos.Add(photo);

        // if(await userRepository.SaveAllAsync()) return mapper.Map<PhotoDto>(photo);

        if(await userRepository.SaveAllAsync()){
            return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problem adding photo");
    }
    // [HttpGet]
    // public ActionResult<IEnumerable<AppUser>> GetUsers()
    // {
    //     var users = _context.Users.ToList();
    //     return users;
    // }
    // [HttpGet("{id:int}")] // api/users/3
    // public ActionResult<AppUser> GetUser(int id)
    // {
    //     var user = _context.Users.Find(id);
    //     if (user == null) return NotFound();
    //     return user;
    // }
}
