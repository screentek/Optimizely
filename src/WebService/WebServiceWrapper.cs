using Imageshop.Optimizely.Plugin.Extensions;
using Imageshop.Optimizely.Plugin.WebService.Responses;
using System.Net.Http;
using System.Threading.Tasks;

namespace Imageshop.Optimizely.Plugin.WebService
{
    /// <summary>
    /// A wrapper class to perform API calls towards the Imageshop API.
    /// This class is used in the ImageshopStore controller to receive necessary information about the selected content before opening the Imageshop client in TinyMCE.
    /// </summary>
    public class WebServiceWrapper : HttpClient
    {
        private readonly string _webServiceUrl;
        private readonly string _token;

        public WebServiceWrapper(string webServiceUrl, string token)
        {
            _webServiceUrl = webServiceUrl;
            _token = token;
        }

        public async Task<GetDocumentIdFromPermalinkResponse> GetDocumentIdFromPermalink(string permalink)
        {
            var request = CreateRequest("GetDocumentIdFromPermalink");
            request.AddParameter("permalink", permalink);
            GetDocumentIdFromPermalinkResponse response = await this.ExecuteAsync<GetDocumentIdFromPermalinkResponse>(request).ConfigureAwait(false);
            return response;
        }

        public async Task<GetDocumentByIdResponse> GetDocumentById(int documentId)
        {
            GetDocumentByIdResponse response = await GetDocumentById("no", documentId).ConfigureAwait(false);
            return response;
        }

        public async Task<GetDocumentByIdResponse> GetDocumentById(string language, int documentId)
        {
            var request = CreateRequest("GetDocumentById");
            request.AddParameter("language", language);
            request.AddParameter("DocumentID", documentId);
            GetDocumentByIdResponse response = await this.ExecuteAsync<GetDocumentByIdResponse>(request).ConfigureAwait(false);
            return response;
        }

        public async Task<bool> StorePermaLinkUrlTest(string url, string permalink)
        {
            var request = CreateRequest("StorePermaLinkUrlTest");
            request.AddParameter("url", url);
            request.AddParameter("permaLink", permalink);
            return await this.ExecuteAndReturnSuccessAsync(request);
        }

        public HttpRequestMessage CreateRequest(string methodName)
        {
            return CreateRequest(HttpMethod.Get, methodName);
        }

        public HttpRequestMessage CreateRequest(HttpMethod method, string methodName)
        {
            var request = new HttpRequestMessage(method, string.Format("{0}/{1}", _webServiceUrl, methodName));

            // Add authentication token
            request.AddParameter("token", _token);

            return request;
        }
    }
}