using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Imageshop.Optimizely.Plugin.Attributes;

namespace Imageshop.Optimizely.Plugin.UrlBuilders
{
    public interface IImageshopDialogUrlBuilder
    {
        UriBuilder BuildDialogUrl(ImageshopSettingsAttribute configurationAttribute, IEnumerable<ImageshopSizePresetAttribute> sizePresetAttributes, bool addVideoParameter);
        NameValueCollection BuildDialogQuery(ImageshopSettingsAttribute configurationAttribute, IEnumerable<ImageshopSizePresetAttribute> sizePresetAttributes, bool addVideoParameter);
    }
}