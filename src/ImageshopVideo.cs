using System.Collections.Generic;

namespace Imageshop.Optimizely.Plugin
{
    public class ImageshopVideo : ImageshopFile
    {
        public virtual IEnumerable<ImageshopVideoData>? Videos { get; set; }
    }
}