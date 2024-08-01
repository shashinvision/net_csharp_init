using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class BuggyController(DataContext context): BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var thing = context.Users.Find(-1);
        if (thing == null) return NotFound();

        return thing;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {

            var thing = context.Users.Find(-1) ?? throw new Exception("A bad thing happened.");
        
            return thing;
            
        // NOTE: we have a middleware that handle the erros throw
        // try
        // {
        //     var thing = context.Users.Find(-1) ?? throw new Exception("A bad thing happened.");
        
        //     return thing;
        // }
        // catch (Exception ex)
        // {
            
        //     return StatusCode(500, "Internal server error: " + ex.Message);
        // }
        
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        
        return BadRequest("This was not a good request");
        
    }

        
}
