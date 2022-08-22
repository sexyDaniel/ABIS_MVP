using ABIS.BusinessLogic.AutomapperProfiles;
using ABIS.BusinessLogic.Services;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Extentions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(CourseByIdProfile).Assembly);
builder.Services.AddDbContext(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000")
            .AllowCredentials();
    });
});

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddSingleton<ISecurityService, SecurityService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<ICourseService, CourseService>();
builder.Services.AddTransient<ICourseSubitemService, CourseSubitemService>();
builder.Services.AddTransient<ITheoryUnitService, TheoryUnitService>();
builder.Services.AddTransient<ITestUnitService, TestUnitService>();
builder.Services.AddTransient<ICompanyService, CompanyService>();
builder.Services.AddTransient<ITestItemService, TestItemsService>();
builder.Services.AddTransient<IAnswerService, AnswersService>();
builder.Services.AddTransient<IRatioQuestionsService, RatioQuestionsService>();
builder.Services.AddTransient<IStatisticsService, StatisticsService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling =
    Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();