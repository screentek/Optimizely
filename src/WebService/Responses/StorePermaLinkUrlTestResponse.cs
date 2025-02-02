using System;
using System.Xml.Serialization;

namespace Imageshop.Optimizely.Plugin.WebService.Responses
{
    [Serializable]
    [XmlRoot("V4Document", Namespace = "http://imageshop.no/V4")]
    public class StorePermaLinkUrlTestResponse
    {
        //[XmlElement]
        //public int DocumentID { get; set; }        
    }
}