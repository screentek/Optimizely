using EPiServer.Shell;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using Imageshop.Optimizely.Plugin;
using System;
using System.Collections.Generic;

namespace Imageshop.Optimizely.Plugin.Descriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(IEnumerable<ImageshopImage>))]
    public class ImageshopImageCollectionEditorDescriptor : ImageshopEditorDescriptorBase
    {
        public ImageshopImageCollectionEditorDescriptor()
        {
            ClientEditingClass = "imageshop-optimizely-plugin/widgets/ImageCollection";
        }

        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            base.ModifyMetadata(metadata, attributes);
            metadata.CustomEditorSettings["uiType"] = metadata.ClientEditingClass;
            metadata.CustomEditorSettings["uiWrapperType"] = UiWrapperType.Flyout;
            metadata.EditorConfiguration["uiWrapperType"] = UiWrapperType.Flyout;
        }
    }
}
