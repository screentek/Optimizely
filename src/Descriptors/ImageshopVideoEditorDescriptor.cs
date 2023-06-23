using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using Imageshop.Optimizely.Plugin;

namespace Imageshop.Optimizely.Plugin.Descriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(ImageshopVideo))]
    public class ImageshopVideoEditorDescriptor : ImageshopEditorDescriptorBase
    {
        protected override bool IsVideoDescriptor { get { return true; } }

        public ImageshopVideoEditorDescriptor()
        {
            ClientEditingClass = "imageshop-optimizely-plugin/widgets/ImageSelector";
        }
    }
}
