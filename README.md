# Imageshop.Optimizely.Plugin
[![Platform](https://img.shields.io/badge/Platform-.NET%204.6.1-blue.svg?style=flat)](https://msdn.microsoft.com/en-us/library/w0x726c2%28v=vs.110%29.aspx)
[![Platform](https://img.shields.io/badge/Episerver-%2012.8.0-blue.svg?style=flat)](https://www.optimizely.com/products/content)

[Imageshop](http://www.imageshop.org) is an online-based Digital Asset Management (DAM) software. This module integrates Imageshop in the [Optimizely 12](http://www.optimizely.com) CMS User Interface. It contains a custom property and a TinyMCE plugin that launches the Imageshop image selection interface in a dialogue.

## How to get started - Installation

### Summary
The installation process currently requires some manual work. We are working to improve this process.

#### 1. Installing Nuget Package:
Start by installing NuGet package (use [Nuget.org feed](https://www.nuget.org/packages/Imageshop.Optimizely.Plugin/))

    Install-Package Imageshop.Optimizely.Plugin
    
Files needed for the project will be copied from the nuget package once the project is built.
If files already exists, they will be overwritten on each build, except for the view files: ImageshopImage.cshtml and ImageshopVideo.cshtml. If you want the newest versions of these files, delete these two and rebuild the project.

#### 2. Adding two lines to your Startup.cs:
Add the following lines to your startup.cs file.

First line to be added at the top (before the CMS is added):

    services.AddImageShopRegistration()

Second line can be added later on:

    services.AddImageshopTinyMceConfiguration()

![ScreenShot](/docs/installation1.png)

#### 3. Add to module.config:
Edit your Module.config file by adding the details from [ModifyTheseFiles/module.config](https://github.com/screentek/Optimizely/tree/master/ModifyTheseFiles). If you don't have a module.config file, copy paste the file into the root directory of your project.

#### 4. Configure access token:

After the package is successfully installed you need to add your access token to configuration section GetaEpiImageshop in your [appsettings.json](https://github.com/screentek/Optimizely/tree/master/ModifyTheseFiles) located in root directory:

```
    "GetaEpiImageshop": {
        "Settings": {
            "token": "<Token here>",
            "interfaceName": "",
            "documentPrefix": "Warning",
            "culture": "nb-NO",
            "profileId": "",
            "showSizeDialog": "true",
            "showCropDialog": "true",
            "freeCrop": "true",
            "initializeTinyMCEPlugin": "true"
        }
    }
```

![ScreenShot](/docs/config.png)

## Basics

### Add an Imageshop image property to your content model:

    [BackingType(typeof(PropertyImageshopImage))]
    [UIHint(ImageshopSettings.UIHint.ImageshopImage)]
    [ImageshopSettings(InterfaceName = "", DocumentPrefix = "", ProfileID = "", Culture = "nb-NO")]
    [ImageshopSizePreset("Main image (1280x720)", 1280, 720)]
    [ImageshopSizePreset("Thumbnail image (400x300)", 400, 300)]
    public virtual ImageshopImage MainImage { get; set; }

### Minimal Imageshop image property example:

    [BackingType(typeof(PropertyImageshopImage))]
    public virtual ImageshopImage MainImage { get; set; }

### Render the image property in a view:

    @Html.PropertyFor(m => m.CurrentPage.MainImage)
    
### Image collection property:

    [Display(Name = "Bilder")]
    [BackingType(typeof(PropertyImageshopImageCollection))]
    [UIHint(ImageshopSettings.UIHint.ImageshopImageCollection)]
    [ImageshopSettings(ProfileID = "CAROUSEL", ShowCropDialog = false, ShowSizeDialog = false)]
    public virtual IEnumerable<ImageshopImage> Images { get; set; }

### Imageshop video property:

	[BackingType(typeof(PropertyImageshopVideo))]
	public virtual ImageshopVideo MainVideo { get; set; }

### Render the video property in a view:

	@Html.PropertyFor(m => m.CurrentPage.MainVideo)

### Imageshop video collection property:

	[BackingType(typeof(PropertyImageshopVideoCollection))]
    [UIHint(ImageshopSettings.UIHint.ImageshopVideoCollection)]
	public virtual IEnumerable<ImageshopVideo> Videos { get; set; }

## TinyMCE

A TinyMCE plugin is included for browsing Imageshop images to add to your XhtmlString properties. It's located in the "media" group.

## Configuration

| Parameter		      		| Type       | Description                                                                      	|
| ------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| baseUrl        			| string     | Base URL to Imageshop client. Default is https://client.imageshop.no/InsertImage2.aspx |
| token          			| string     | Token identifying the user.                                                      	|
| interfaceName  			| string     | Standard interface used when searching images.                                  		|
| documentPrefix 			| string     | Standard document code prefix used when uploading images.                        	|
| culture        			| string     | Language for the client. Supports en-US and nb-NO. Norwegian is default (nb-NO). 	|
| showSizeDialog 			| true/false | Indicates whether the size dialogue should be shown. Default is true.            	|
| showCropDialog		 	| true/false | Indicates whether the crop dialogue should be show. Default is true.             	|
| initializeTinyMCEPlugin	| true/false | Indicates whether the tinymce plugin should be initialized.					            |
| sizePresets				| string     | Separated with semicolon and colon. See IMAGESHOPSIZES: https://apidocumentation.imageshop.no/	|

See configuration section &lt;geta.epi.imageshop&gt; in web.config for examples.

## Screenshots

![ScreenShot](/docs/imageshop-epi-dialogue.png)

![ScreenShot](/docs/imageshop-selection.png)

![ScreenShot](/docs/imageshop-tinymce-plugin.png)

## Changelog
-
