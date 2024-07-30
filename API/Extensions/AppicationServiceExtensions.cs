using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class AppicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        // Add services to the container.

        services.AddControllers();

        // My personal database connection to use SQLite Service 
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // Custom Cors policy
        services.AddCors();

        services.AddScoped<ITokenService, TokenService>(); // I Just need <TokenService> but is more declarative use <ITokenService, TokenService>


        return services;

    }
}
