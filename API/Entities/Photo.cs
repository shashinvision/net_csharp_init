namespace API.Entities; // This is for diferent namespace for Models = Entities on C# Projects

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public required AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
}