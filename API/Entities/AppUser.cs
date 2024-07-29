namespace API.Entities; // This is for diferent namespace for Models = Entities on C# Projects

public class AppUser
{
    public int Id { get; set; } // Default value is 0 always 
    public required string UserName { get; set; } // ? optional signal  string?, but if you need it to required you need to use public required string UserName, this is for string

    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
