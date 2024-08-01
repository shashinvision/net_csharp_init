using API;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ADD custom extension services on Dir Extensions
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // From AddAuthentication using JwtBearerDefaults
app.UseAuthorization();


app.UseMiddleware<ExceptionMiddleware>();
// Use custom Cors for use with Angular
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.MapControllers();

app.Run();
