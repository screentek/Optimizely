using System;
using System.Xml.Serialization;

namespace Imageshop.Optimizely.Plugin.WebService.Responses
{
    [Serializable]
    [XmlRoot("int", Namespace = "http://imageshop.no/V4")]
    public class GetDocumentIdFromPermalinkResponse
    {
        [XmlText]
        public int DocumentID { get; set; }
    }
}