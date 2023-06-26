using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using Imageshop.Optimizely.Plugin;

namespace Imageshop.Optimizely.Plugin.Descriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(ImageshopImage))]
    public class ImageshopImageEditorDescriptor : ImageshopEditorDescriptorBase
    {
        public ImageshopImageEditorDescriptor()
        {
            ClientEditingClass = "imageshop-optimizely-plugin/widgets/ImageSelector";
        }
    }
}
