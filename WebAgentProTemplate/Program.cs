using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebAgentPro.Data;

namespace WebAgentPro
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = BuildWebHost(args);

      SeedDb(host);

      host.Run();
    }

    public static IWebHost BuildWebHost(string[] args)
    {
      var builder = WebHost.CreateDefaultBuilder(args);

      builder.UseStartup<Startup>();

      return builder.Build();
    }

    private static void SeedDb(IWebHost host)
    {
      var scopeFactory = host.Services.GetService<IServiceScopeFactory>();
      using (var scope = scopeFactory.CreateScope())
      {
        var seeder = scope.ServiceProvider.GetService<WapDbSeeder>();
        seeder.Seed();
      }
    }
  }
}
