using System.IO;
using System.Reflection;

namespace Imageshop.Optimizely.Plugin.Helpers
{
    public static class ImageshopPluginHelper
    {
        public static string GetPluginAssemblyVersion()
        {
            return GetPluginAssembly().GetCustomAttribute<AssemblyFileVersionAttribute>().Version;
        }

        public static string GetPluginAssemblyName()
        {
            return GetPluginAssembly().GetName().Name;
        }

        private static Assembly GetPluginAssembly()
        {
            // Get the directory path of the current assembly
            var assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            // Get the file path of the plugin assembly
            var pluginAssemblyPath = Path.Combine(assemblyDirectory, "Imageshop.Optimizely.Plugin.dll");

            // Load the plugin assembly dynamically
            return Assembly.LoadFrom(pluginAssemblyPath);
        }
    }
}
