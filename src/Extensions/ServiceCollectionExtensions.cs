using EPiServer.Cms.TinyMce.Core;
using EPiServer.Shell.Modules;
using Imageshop.Optimizely.Plugin.Configuration;
using Imageshop.Optimizely.Plugin.Helpers;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Reflection;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddImageShopRegistration(this IServiceCollection services)
        {
            var executingAssembliy = Assembly.GetExecutingAssembly();

            services.Configure<ProtectedModuleOptions>(o => o.Items.Add(new ModuleDetails { Name = "Imageshop.Optimizely.Plugin" }));

            return services.Configure<IMvcBuilder>(x => x.AddApplicationPart(executingAssembliy));
        }

        public static IServiceCollection AddImageshopTinyMceConfiguration(this IServiceCollection services)
        {
            bool initializeTinyMCEPlugin = ImageshopConfigurationSection.Settings.InitializeTinyMCEPlugin;
            if (initializeTinyMCEPlugin)
            {
                services.Configure<TinyMceConfiguration>(config =>
                {
                    config.Default()
                        .AddEpiserverSupport()
                        .AddExternalPlugin("imageshopoptimizelyplugin", EPiServer.Shell.Paths.ToClientResource(ImageshopPluginHelper.GetPluginAssemblyName(), "ClientResources/tinymce/editor_plugin.js"))
                        .AppendToolbar("imageshopoptimizelyplugin");
                });
            }
            return services;
        }
    }
}
