using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Imageshop.Optimizely.Plugin.Controllers
{
    [Route("imageshoptinymce")]
    [Authorize(Roles = "WebAdmins, Administrators, WebEditors, CmsAdmins, CmsEditors")]
    /// <summary>
    ///  Controller used to display view in popup for TinyMCE to Imageshop
    ///  This controller is restricted to the following roles: "WebAdmins, Administrators, WebEditors, CmsAdmins, CmsEditors"
    /// </summary>
    public class ImageshopInsertImageController : Controller
    {
        public ImageshopInsertImageController()
        {
        }

        [Route("insertimage")]
        public IActionResult Index(string tinyMce = "False", string image = "")
        {
            return PartialView("~/ClientResources/geta-epi-imageshop/tinymce/plugins/getaepiimageshop/InsertImage.cshtml", new InsertImageModel());
        }
    }
}