using System;

namespace Imageshop.Optimizely.Plugin.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class ImageshopSizePresetAttribute : Attribute
    {
        private string? _name;

        public ImageshopSizePresetAttribute(int width, int height) : this(null!, width, height)
        {
        }

        public ImageshopSizePresetAttribute(string name, int width, int height)
        {
            Name = name;
            Width = width;
            Height = height;
        }

        public string Name
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_name))
                {
                    _name = string.Format("{0}x{1}", Width, Height);
                }

                return _name;
            }
            set
            {
                _name = value;
            }
        }

        public int Width { get; set; }
        public int Height { get; set; }
    }
}
