"use strict";
var tinymce = tinymce || {};

var currentUrl = location.href;

tinymce.PluginManager.add("getaepiimageshop", function (ed, url) {
    var imageNode;

    console.log("Tinymce version: " + tinymce.majorVersion + "." + tinymce.minorVersion);

    var hostUrl = location.protocol + '//' + location.host;

    if (hostUrl.includes('undefined')) {
        var urlParts = ed.documentBaseUrl.match(/^(\w+:)\/\/([^:/?]+)(?::(\d+))?/);
        if (urlParts) {
            var protocol = urlParts[1];
            var hostname = urlParts[2];
            var port = urlParts[3] ? urlParts[3] : "";

            hostUrl = protocol + '//' + hostname + (port ? ':' + port : '');
        }
    }

    var buttonTitle = "Insert/Upload Imageshop Image";
    var buttonText = "";
    var buttonIcon = url + "/images/icon.png";
    var controllerPath = "/imageshoptinymce/insertimage/";
    var dialogUrl = hostUrl + controllerPath + "?TINYMCE=true&TINYMCEEXTENDED=true";

    if (tinymce.majorVersion >= 5) {
        // Register icon for Imageshop
        ed.ui.registry.addIcon('imageshopIcon', '<img src="' + buttonIcon + '" />');

        // Register buttons
        ed.ui.registry.addButton('getaepiimageshop', {
            title: buttonTitle,
            text: buttonText,
            icon: 'imageshopIcon',
            onAction: function () {
                try {
                    var currentDialogUrl = dialogUrl;

                    if (ed.selection !== null && ed.selection.getNode() !== null && ed.selection.getNode().src !== null)
                        dialogUrl += "&image=" + encodeURIComponent(ed.selection.getNode().src);

                    tinymce.activeEditor.windowManager.openUrl({
                        title: 'ImageShop',
                        url: currentDialogUrl,
                        buttons: [{
                            type: 'cancel',
                            name: 'close',
                            text: 'Close'
                        }]
                    });

                } catch (error) {
                    console.log("Error setting up button action: " + error);
                }
            },
            onSetup: function (api) {
                // Node change handler to toggle button active state
                const nodeChangeHandler = function(e) {
                    var isWebShopImage = e.element.tagName === "IMG" && (ed.dom.getAttrib(e.element, "class").indexOf("ScrImageshopImage") > -1 || ed.dom.getAttrib(e.element, "class").indexOf("mceItem") === -1);

                    //Set or reset imageNode to the node cause Image Editor command enabled
                    imageNode = isWebShopImage ? e.element : null;
                    api.setEnabled(true);
                }; 

                // Register node change handler
                ed.on('NodeChange', nodeChangeHandler);

                // Return function to unregister node change handler
                return function() {
                    ed.off('NodeChange', nodeChangeHandler);
                };
            }
        });
    }
    else {
        console.log("running tinymce setup for versions older than version 5");

        // Register commands
        ed.addCommand('mcegetaepiimageshop', function () {

            try {
                var currentDialogUrl = dialogUrl;

                if (ed.selection !== null && ed.selection.getNode() !== null && ed.selection.getNode().src !== null)
                    dialogUrl += "&image=" + encodeURIComponent(ed.selection.getNode().src);

                ed.windowManager.open({
                    file: currentDialogUrl,
                    width: 950,
                    height: 650,
                    scrollbars: 1,
                    inline: 1
                }, {
                    plugin_url: url
                });
            } catch (error) {
                console.log("Error running command mcegetaepiimageshop: " + error);
            }
        });

        // Register buttons
        ed.addButton("getaepiimageshop", {
            title: buttonTitle,
            cmd: "mcegetaepiimageshop",
            image: buttonIcon,
            onPostRender: function () {
                // Add a node change handler, selects the button in the UI when a image is selected
                ed.on("NodeChange", function (e) {
                    //Prevent tool from being activated as objects represented as images.
                    var isWebShopImage = e.element.tagName === "IMG" && (ed.dom.getAttrib(e.element, "class").indexOf("ScrImageshopImage") > -1 || ed.dom.getAttrib(e.element, "class").indexOf("mceItem") === -1);
                    this.active(isWebShopImage);

                    //Set or reset imageNode to the node cause Image Editor command enabled
                    imageNode = isWebShopImage ? e.element : null;
                }.bind(this));
            }
        });
    }

    return {
        getMetadata: function () {
            return {
                name: "Imageshop image plugin",
                url: "https://github.com/screentek/Optimizely",
                author: 'Geta AS, Bouvet, Imageshop, tinymce 3.3.0',
                authorurl: 'https://github.com/screentek/Optimizely',
                infourl: 'https://github.com/screentek/Optimizely',
                version: tinymce.majorVersion + "." + tinymce.minorVersion
            };
        }
    };
});

