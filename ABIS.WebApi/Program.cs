using ABIS.BusinessLogic.Services;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Extentions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddSingleton<ISecurityService, SecurityService>();

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling =
    Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();