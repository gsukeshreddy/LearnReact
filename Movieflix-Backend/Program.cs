using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Movieflix_Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Bind and register MoviesConfig
var moviesConfig = builder.Configuration.GetSection("MoviesConfig").Get<MoviesConfig>();
builder.Services.AddSingleton<MoviesConfig>(moviesConfig);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // Vite dev server port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient();

var app = builder.Build();

// Uncomment to enforce HTTPS
// app.UseHttpsRedirection();

app.UseRouting();

// Use the named CORS policy
app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

app.Run();
