using EPiServer.PlugIn;

namespace Imageshop.Optimizely.Plugin
{
    [PropertyDefinitionTypePlugIn(DisplayName = "Imageshop Image")]
    public class PropertyImageshopImage : PropertyJsonSerializedObject<ImageshopImage>
    {
    }
}
