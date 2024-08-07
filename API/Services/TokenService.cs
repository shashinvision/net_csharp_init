
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenkey = config["TokenKey"] ?? throw new Exception("Cannot access tokenKey from appsettings.json");
        if(tokenkey.Length < 64 ) throw new Exception("Your tokenKey is too short");

         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));

         var claims = new List<Claim>
         {
            //  new Claim(ClaimTypes.NameIdentifier, user.UserName) is the same for both
            new(ClaimTypes.NameIdentifier, user.UserName)
         };

         var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

         var tokeDescriptor = new SecurityTokenDescriptor
         {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
         };

         var tokenHandler = new JwtSecurityTokenHandler();
         var token = tokenHandler.CreateToken(tokeDescriptor);
         return tokenHandler.WriteToken(token);

    }
}
