using System.Collections.Generic;
using EPiServer.PlugIn;

namespace Imageshop.Optimizely.Plugin
{
    [PropertyDefinitionTypePlugIn(DisplayName = "Imageshop Video Collection")]
    public class PropertyImageshopVideoCollection : PropertyJsonSerializedObject<IEnumerable<ImageshopVideo>>
    {
    }
}
