# Geta.EPi.Imageshop

[Imageshop](http://www.imageshop.org) is an online-based Digital Asset Management (DAM) software. This module integrates Imageshop in the [Optimizely 12](http://www.optimizely.com) CMS User Interface. It contains a custom property and a TinyMCE plugin that launches the Imageshop image selection interface in a dialogue.

## How to get started

### Installing Nuget Package:
Start by installing NuGet package (use [Episerver Nuget](http://nuget.episerver.com))

    Install-Package Imageshop.Optimizely.Plugin

### Copying files: 
Download this nuget package as a zip file, copy all files inside of the folder "CopyTheseFiles" into the root directory of your project.

### Adding two lines to your Startup.cs:
Add the following lines to your startup.cs file.

First line to be added at the top:

    services.AddImageShopRegistration()

Second line can be added later on:

    services.AddImageshopTinyMceConfiguration()

![ScreenShot](/docs/installation1.png)

### Add to module.config:
Edit your Module.config file by adding the details from ModifyTheseFiles/module.config. If you don't have a module.config file, copy paste the file into the root directory of your project.

### Configure access token:

After the package is successfully installed you need to add your access token to configuration section GetaEpiImageshop in your appsettings.json located in root directory:

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

Add an Imageshop image property to your content model:

    [BackingType(typeof(PropertyImageshopImage))]
    [UIHint(ImageshopSettings.UIHint.ImageshopImage)]
    [ImageshopSettings(InterfaceName = "", DocumentPrefix = "", ProfileID = "", Culture = "nb-NO")]
    [ImageshopSizePreset("Main image (1280x720)", 1280, 720)]
    [ImageshopSizePreset("Thumbnail image (400x300)", 400, 300)]
    public virtual ImageshopImage MainImage { get; set; }

Minimal Imageshop image property example:

    [BackingType(typeof(PropertyImageshopImage))]
    public virtual ImageshopImage MainImage { get; set; }

Render the image property in a view:

    @Html.PropertyFor(m => m.CurrentPage.MainImage)
    
Image collection property:

    [Display(Name = "Bilder")]
    [BackingType(typeof(PropertyImageshopImageCollection))]
    [UIHint(ImageshopSettings.UIHint.ImageshopImageCollection)]
    [ImageshopSettings(ProfileID = "CAROUSEL", ShowCropDialog = false, ShowSizeDialog = false)]
    public virtual IEnumerable<ImageshopImage> Images { get; set; }

Imageshop video property:

	[BackingType(typeof(PropertyImageshopVideo))]
	public virtual ImageshopVideo MainVideo { get; set; }

Render the video property in a view:

	@Html.PropertyFor(m => m.CurrentPage.MainVideo)

Imageshop video collection property:

	[BackingType(typeof(PropertyImageshopVideoCollection))]
    [UIHint(ImageshopSettings.UIHint.ImageshopVideoCollection)]
	public virtual IEnumerable<ImageshopVideo> Videos { get; set; }

## TinyMCE

A TinyMCE plugin is included for browsing Imageshop images to add to your XhtmlString properties. It's located in the "media" group.

## Configuration

| Parameter		      		| Type       | Description                                                                      	|
| ------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| baseUrl        			| string     | Base URL to Imageshop client. Default is http://client.imageshop.no/InsertImage.aspx |
| token          			| string     | Token identifying the user.                                                      	|
| interfaceName  			| string     | Standard interface used when searching images.                                  		|
| documentPrefix 			| string     | Standard document code prefix used when uploading images.                        	|
| culture        			| string     | Language for the client. Supports en-US and nb-NO. Norwegian is default (nb-NO). 	|
| showSizeDialog 			| true/false | Indicates whether the size dialogue should be shown. Default is true.            	|
| showCropDialog		 	| true/false | Indicates whether the crop dialogue should be show. Default is true.             	|
| initializeTinyMCEPlugin	| true/false | Version 1.7.0, enables plug in for TinyMCE v > 2.0						            |

See configuration section &lt;geta.epi.imageshop&gt; in web.config for examples.

## Screenshots

![ScreenShot](/docs/epi-dialogue.jpg)

![ScreenShot](/docs/imageshop-selection.jpg)

![ScreenShot](/docs/tinymce-plugin.jpg)

## Changelog