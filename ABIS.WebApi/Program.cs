using ABIS.BusinessLogic.Services;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Extentions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddSingleton<ISecurityService, SecurityService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<ICourseService, CourseService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling =
    Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();