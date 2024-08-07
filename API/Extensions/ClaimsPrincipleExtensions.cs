using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{  
    public static string GetUserName(this ClaimsPrincipal user)
    {
        var username = user.FindFirst(ClaimTypes.NameIdentifier) ?? throw new Exception("Cannot get the username from the token");
        
        return username.Value;
    }
}
