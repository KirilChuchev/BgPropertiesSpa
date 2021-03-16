﻿using BgPropertiesServer.Data;
using BgPropertiesServer.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BgPropertiesServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //public CorsPolicy GenerateCorsPolicy()
        //{
        //    var corsBuilder = new CorsPolicyBuilder();
        //    corsBuilder.AllowAnyHeader();
        //    corsBuilder.AllowAnyMethod();
        //    //corsBuilder.AllowAnyOrigin(); // For anyone access.
        //    corsBuilder.WithOrigins("http://localhost:44364"); // for a specific url. Don't add a forward slash on the end!
        //    corsBuilder.AllowCredentials();
        //    return corsBuilder.Build();
        //}

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //TODO Добавено от мен.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();

            services.AddCors(
            //    options =>
            //{
            //    options.AddPolicy("AllowAllOrigins", GenerateCorsPolicy());
            //}
            );
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0); // TODO: от мен
            services.AddTransient<IBgPropertiesService, BgPropertiesService>();
            services.AddTransient<ISearchSetService, SearchSetService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Make sure you call this before calling app.UseMvc()
            app.UseCors(
                options => options.WithOrigins("https://localhost:44364/").AllowAnyMethod()//.AllowAnyHeader()
            );

            //app.UseMvc();

            //TODO: от мен
            app.UseExceptionHandler(a => a.Run(async context =>
            {
                var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                var exception = exceptionHandlerPathFeature.Error;

                var result = JsonConvert.SerializeObject(new { error = exception.Message });
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(result);
            }));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
