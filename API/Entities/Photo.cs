using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities; // This is for diferent namespace for Models = Entities on C# Projects

[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation property for the AppUser entity
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}