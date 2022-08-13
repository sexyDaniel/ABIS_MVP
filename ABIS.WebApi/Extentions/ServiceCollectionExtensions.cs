using ABIS.Common.Interfaces;
using ABIS.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace ABIS.WebApi.Extentions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDbContext(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddDbContext<IDbContext, SqlServerDbContext>(config =>
        {
            config
                .UseSqlServer(configuration.GetConnectionString("RemoteConnection"))
                .UseLoggerFactory(LoggerFactory.Create(loggerConfig =>
                {
                    loggerConfig.AddConsole();
                    loggerConfig.SetMinimumLevel(LogLevel.Information);
                }));
        });

        return services;
    }
}