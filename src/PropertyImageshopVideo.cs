using EPiServer.PlugIn;

namespace Imageshop.Optimizely.Plugin
{
    [PropertyDefinitionTypePlugIn(DisplayName = "Imageshop Video")]
    public class PropertyImageshopVideo : PropertyJsonSerializedObject<ImageshopVideo>
    {
    }
}
