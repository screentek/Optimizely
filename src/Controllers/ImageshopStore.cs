using Microsoft.AspNetCore.Mvc;
using EPiServer.Shell.Services.Rest;
using Imageshop.Optimizely.Plugin.WebService;
using Imageshop.Optimizely.Plugin.WebService.Responses;
using Imageshop.Optimizely.Plugin.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace Imageshop.Optimizely.Plugin.Controllers
{
    [RestStore("imageshopextended")]
    [Area("imageshopextended")]
    [Route("imageshopextended/[controller]")]
    [Authorize(Roles = "WebAdmins, Administrators, WebEditors, CmsAdmins, CmsEditors")]
    /// <summary>
    ///  Controller used to retrieve extended metadata view in popup for TinyMCE to Imageshop
    ///  This controller is restricted to the following roles: "WebAdmins, Administrators, WebEditors, CmsAdmins, CmsEditors"
    /// </summary>
    public class ImageshopStore : RestControllerBase
    {
        private readonly WebServiceWrapper _webServiceWrapper;

        public ImageshopStore()
        {
            _webServiceWrapper = new WebServiceWrapper(ImageshopConfigurationSection.Settings.WebServiceUrl!, ImageshopConfigurationSection.Settings.Token!);
        }

        [HttpGet]
        public ActionResult Get(string permalink)
        {
            GetDocumentIdFromPermalinkResponse idResponse = _webServiceWrapper.GetDocumentIdFromPermalink(permalink).Result;

            if (idResponse != null)
            {
                GetDocumentByIdResponse documentResponse = _webServiceWrapper.GetDocumentById(idResponse.DocumentID).Result;

                if (documentResponse != null)
                {
                    return Rest(documentResponse);
                }
            }

            return Rest(null);
        }
    }
}