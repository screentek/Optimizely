using System.Collections.Generic;

namespace Imageshop.Optimizely.Plugin
{
    /// <summary>
    /// Property type that contains videodata and metadata for videoes in Imageshop
    /// </summary>
    public class ImageshopVideo : ImageshopFile
    {
        public virtual IEnumerable<ImageshopVideoData> Videos { get; set; }
    }
}