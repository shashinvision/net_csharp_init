using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/users
public class UsersController(DataContext context) : ControllerBase // Using primary constructor here to use _context, is to much clean code
{
    private readonly DataContext _context = context; // When i use private attributes i have to use _

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() // Asyncronous method
    {
        var users = await _context.Users.ToListAsync();
        return users;
    }
    [HttpGet("{id:int}")] // api/users/3
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();
        return user;
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
