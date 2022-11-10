using System.Collections.Generic;
using EPiServer.PlugIn;

namespace Imageshop.Optimizely.Plugin
{
    [PropertyDefinitionTypePlugIn(DisplayName = "Imageshop Image Collection")]
    public class PropertyImageshopImageCollection : PropertyJsonSerializedObject<IEnumerable<ImageshopImage>>
    {
    }
}
