using FamilyTreeApi.API.Middleware;
using FamilyTreeApi.Application.Interfaces;
using FamilyTreeApi.Application.Services;
using FamilyTreeApi.Crosscutting;
using FamilyTreeApi.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<ClientValidationOptions>(builder.Configuration.GetSection("ClientValidation"));
builder.Services.Configure<CorsOptions>(builder.Configuration.GetSection("Cors"));

builder.Services.AddCors(options =>
{
    var corsOptions = builder.Configuration.GetSection("Cors").Get<CorsOptions>();
    options.AddPolicy("AllowFamilyTreeUiApp",
        builder => builder.WithOrigins(corsOptions.AllowedOrigins)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
});

// Register Application layer Services
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<IFamilyTreeRepository, InMemoryFamilyTreeRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFamilyTreeUiApp");

app.UseMiddleware<ClientIdValidationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
