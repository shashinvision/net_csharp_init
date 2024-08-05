using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// [ApiController]
// [Route("api/[controller]")] // /api/users

[Authorize] // Use when you need authentication, need to be on the top of the controller or on the method
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController // extend of BaseApiController for reutilizable code
{
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers() // Asyncronous method
    {
        // var users = await context.Users.ToListAsync();
        // return users;

        var users = await userRepository.GetUsersAsync();

        var usersToReturn = mapper.Map<IEnumerable<MemberDTO>>(users);

        return Ok(usersToReturn);
    }

    // [Authorize]
    // [HttpGet("{id:int}")] // api/users/3
    // public async Task<ActionResult<AppUser>> GetUser(int id)
    [HttpGet("{username}")] // api/users/3
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        // var user = await context.Users.FindAsync(id);
        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound();

        var userToReturn = mapper.Map<MemberDTO>(user);
        
        return userToReturn;
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
