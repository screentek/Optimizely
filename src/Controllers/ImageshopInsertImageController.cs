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
            return PartialView("~/Views/Imageshop/InsertImage.cshtml", new InsertImageModel());
            //return PartialView("~/modules/Imageshop.Optimizely.Plugin/1.1.10031/Views/Imageshop/InsertImage.cshtml", new InsertImageModel());
            //return PartialView("https://localhost:5000/modules/Imageshop.Optimizely.Plugin/1.1.10032/Views/Imageshop/InsertImage.cshtml", new InsertImageModel());
        }
    }
}