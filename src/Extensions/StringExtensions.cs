using System;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    /// <summary>
    /// Extension class for String to decode and encode text input
    /// </summary>
    public static class StringExtensions
    {
        public static string UrlEncode(this string input)
        {
            return Uri.EscapeDataString(input);
        }

        public static string UrlDecode(this string input)
        {
            return Uri.UnescapeDataString(input);
        }
    }
}
