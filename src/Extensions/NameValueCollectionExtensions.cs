using System.Collections.Specialized;
using System.Web;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    public static class NameValueCollectionExtensions
    {
        public static void AddIfNotNull(this NameValueCollection nvc, string name, string value)
        {
            if (string.IsNullOrEmpty(value) == false)
            {
                nvc.Add(name, value);
            }
        }
    }
}