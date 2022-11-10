using EPiServer.Cms.TinyMce.Core;
using Imageshop.Optimizely.Plugin.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddImageShopRegistration(this IServiceCollection services)
        {
            var executingAssembliy = Assembly.GetExecutingAssembly();

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
                        .AddExternalPlugin("getaepiimageshop", "/ClientResources/geta-epi-imageshop/tinymce/plugins/getaepiimageshop/editor_plugin.js")
                        .AppendToolbar("getaepiimageshop");
                });
            }
            return services;
        }
    }
}
