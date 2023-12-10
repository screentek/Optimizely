using Microsoft.AspNetCore.Mvc;
using EPiServer.Shell.Services.Rest;
using Imageshop.Optimizely.Plugin.WebService;
using Imageshop.Optimizely.Plugin.WebService.Responses;
using Imageshop.Optimizely.Plugin.Configuration;
using Microsoft.AspNetCore.Authorization;
using System;
using EPiServer.Logging;

namespace Imageshop.Optimizely.Plugin.Controllers
{
    [RestStore("imageshopstore")]
    [Authorize(Roles = "WebAdmins, Administrators, WebEditors, CmsAdmins, CmsEditors")]
    /// <summary>
    ///  Controller used to retrieve extended metadata view in dialog windows.
    ///  The ImageshopStore is registered in the inititializer specified in the module.config file.
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
        [Route("/imageshopextended/imageshopstore/")]
        public ActionResult Get(string permalink)
        {
            try
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
            } catch (Exception ex)
            {
                var logger = LogManager.GetLogger(typeof(ImageshopStore));
                logger.Error("Error fetching documents from ImageShop: permalink " + permalink + ". Message: " + ex.Message);
            }

            return Rest(null);
        }
    }
}