using API.Extensions;

namespace API.Entities; // This is for diferent namespace for Models = Entities on C# Projects

public class AppUser
{
    public int Id { get; set; } // Default value is 0 always 
    public required string UserName { get; set; } // ? optional signal  string?, but if you need it to required you need to use public required string UserName, this is for string

    // public required byte[] PasswordHash { get; set; }
    // public required byte[] PasswordSalt { get; set; }

    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateofBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public required string? Introduction { get; set; }
    public required string? LookingFor { get; set; }
    public required string? Interests { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public List<Photo> Photos { get; set; } = [];

    public int GetAge () => DateofBirth.CalculateAge(); 
    
    // NOTE: Arrow funtion, is an abreviation for method, is the same like this:

    // public int getAge(){
    //     return DateofBirth.CalculateAge();
    // }
}
