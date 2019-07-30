using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using System.Reflection;
using System.Text;
using WebAgentPro.Data;
using WebAgentPro.Models;

namespace WebAgentPro
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IHostingEnvironment env)
        {
            #region CONFIGURATION     Load configuration from appsettings.json files
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            #endregion
        }

        public void ConfigureServices(IServiceCollection services)
        {
            #region CONFIGURATION           Allow injection of IConfiguration into controllers
            services.AddSingleton<IConfiguration>(Configuration);
            #endregion

            #region AUTOMAPPER              Map between DTOs and Entities
            Mapper.Initialize(configuration =>
            {
                configuration.AddProfile<WapMapperProfile>();
            });
            #endregion

            #region CORS                    Allow access from other domains
            services.AddCors();
            #endregion

            #region DATABASE               Register and seed your database
            var connectionString = Configuration.GetConnectionString("WebAgentPro");
            services.AddDbContext<WapDbContext>(config => config.UseSqlServer(connectionString));

            services.AddTransient<WapDbSeeder>();
            #endregion

            #region IDENTITY                Configure ASP.NET Identity to use your DbContext and ApplicationUser
            services.AddIdentity<WapUser, IdentityRole>()
                      .AddEntityFrameworkStores<WapDbContext>();
            #endregion

            #region MVC                     Configure to ignore loops in object models and to validate new API rules
            services.AddMvc()
                      .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                      .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            #endregion

            #region JWT AUTHENTICATION      Turn on and configure JWT Beara Token Authentication
            ConfigureJwtAuthentication(services);
            #endregion

            #region SWAGGER                 Provide a Swagger endpoint for your API
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Web Agent Pro Template", Version = "v1" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            #endregion

            #region SPA STATIC FILES        Configure location of Angular runtime files
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/clientapp/dist";
            });
            #endregion

            #region YOUR SERVICES           Any custom application services
            #endregion
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Agent Pro Template");
            });

            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }

        private void ConfigureJwtAuthentication(IServiceCollection services)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Tokens:Key")));

            services.AddAuthentication(builder =>
            {
                builder.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                builder.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                options.Validate();
            });
        }
    }
}
