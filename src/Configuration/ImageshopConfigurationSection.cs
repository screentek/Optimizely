using Castle.Core.Internal;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Imageshop.Optimizely.Plugin.Configuration
{
    public static class ImageshopConfigurationSection
    {
        private static ImageshopSettings? _settings;
        public static ImageshopSettings Settings { 
            get
            {
                if (_settings == null) return GetSettingsSection();
                return _settings;
            }
        }

        private static ImageshopSettings GetSettingsSection()
        {
            var settingsSection = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("GetaEpiImageshop:Settings");

            try
            {
                var settings = new ImageshopSettings()
                {
                    BaseUrl = settingsSection["baseUrl"] ?? "https://client.imageshop.no/InsertImage2.aspx",
                    Token = settingsSection["token"],
                    ShowSizeDialog = bool.Parse(settingsSection["showSizeDialog"]),
                    ShowCropDialog = bool.Parse(settingsSection["showCropDialog"]),
                    FreeCrop = bool.Parse(settingsSection["freeCrop"]),
                    InterfaceName = settingsSection["interfaceName"],
                    DocumentPrefix = settingsSection["documentPrefix"],
                    Culture = settingsSection["culture"],
                    ProfileID = settingsSection["profileID"],
                    WebServiceUrl = settingsSection["webServiceUrl"] ?? "https://webservices.imageshop.no/v4.asmx",
                    InitializeTinyMCEPlugin = bool.Parse(settingsSection["initializeTinyMCEPlugin"]),
                    SizePresets = GetListOfSizePresets(settingsSection["sizePresets"] ?? string.Empty)
                };

                _settings = settings;
                return settings;
            } catch (Exception)
            {
                throw new Exception("Problem occurred reading GetaEpiImageshop section from appSettings.json, please check your configuration.");
            }
        }

        private static List<ImageshopSizePresetElement> GetListOfSizePresets(string sizePresets)
        {
            var listOfSizeElements = new List<ImageshopSizePresetElement>();

            foreach (var sizeString in sizePresets.Split(':'))
            {
                if (sizeString.IsNullOrEmpty()) continue;

                var sizeStringParts = sizeString.Split(';');
                if (sizeStringParts.Length != 2) continue;

                var sizeName = sizeStringParts[0];
                if (sizeName.Trim().IsNullOrEmpty()) continue;

                var sizesPartsString = sizeStringParts[1].ToLower().Split('x');

                if (sizesPartsString.Length != 2) continue;

                int width = 0;
                int height = 0;

                try
                {
                    width = int.Parse(sizesPartsString[0]);
                    height = int.Parse(sizesPartsString[1]);
                } catch (Exception)
                {
                    continue;
                }

                listOfSizeElements.Add(new ImageshopSizePresetElement
                {
                    Name = sizeName,
                    Width = width,
                    Height = height
                });
            }

            return listOfSizeElements;
        }
    }
}
