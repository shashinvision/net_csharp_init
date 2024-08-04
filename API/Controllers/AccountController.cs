using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] //acount/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){

        if (await UserExists(registerDto.UserName)) return BadRequest("UserName is taken");

        return Ok();
        // TODO: remove this commetns when all entities are created, this ok above is temporal
        // using var hmac = new HMACSHA512();

        // var user = new AppUser
        // {
        //     UserName = registerDto.UserName.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // context.Users.Add(user);
        // await context.SaveChangesAsync();
        // return new UserDto{
        //     UserName = user.UserName,
        //     Token = tokenService.CreateToken(user)
        // };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
        var user = await context.Users.FirstOrDefaultAsync(User => User.UserName.ToLower() == loginDto.UserName.ToLower());

        if (user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++){
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto{
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };
        
    }


    private async Task<bool> UserExists(string username){
        return await context.Users.AnyAsync(User => User.UserName.ToLower() == username.ToLower());
    }

}
