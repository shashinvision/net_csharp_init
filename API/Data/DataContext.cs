using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options) // This is a primary constructor for the class using VSCode auto-completion boilerplate, the constructor is called when you create a new instance of the class
{
    public DbSet<AppUser> Users { get; set; }
}