using EPiServer.Cms.TinyMce.Core;
using EPiServer.Shell.Modules;
using Imageshop.Optimizely.Plugin.Configuration;
using Imageshop.Optimizely.Plugin.Helpers;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Reflection;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    /// <summary>
    /// Static class that is called from within the executing assembly. This is used during startup of projects to enable the Imageshop Plugin.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Typically called from the Startup.cs file of the project that has the plugin installed. 
        /// Registers the plugin as a protected module.
        /// </summary>
        public static IServiceCollection AddImageShopRegistration(this IServiceCollection services)
        {
            var executingAssembliy = Assembly.GetExecutingAssembly();

            services.Configure<ProtectedModuleOptions>(o => o.Items.Add(new ModuleDetails { Name = "Imageshop.Optimizely.Plugin" }));

            return services.Configure<IMvcBuilder>(x => x.AddApplicationPart(executingAssembliy));
        }

        /// <summary>
        /// Typically called from the Startup.cs file of the project that has the plugin installed.
        /// Enables the Imageshop Plugin for TinyMCE. 
        /// </summary>
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
