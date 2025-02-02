﻿using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Imageshop.Optimizely.Plugin.Extensions
{
    /// <summary>
    /// Static class used by the WebServiceWrapper to perform API calls towards the Imageshop API.
    /// </summary>
    public static class HttpClientExtensions
    {
        public static async Task<T> ExecuteAsync<T>(this HttpClient client, HttpRequestMessage request)
        {
            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var resultData = await response.Content.ReadAsStreamAsync().ConfigureAwait(false);
            var serializer = new XmlSerializer(typeof(T));
            var data = (T)serializer.Deserialize(resultData);
            return data!;
        }
        public static async Task<bool> ExecuteAndReturnSuccessAsync(this HttpClient client, HttpRequestMessage request)
        {
            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            return response.IsSuccessStatusCode;
        }
    }
}
