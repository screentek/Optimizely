"use strict";
var tinymce = tinymce || {};

var currentUrl = location.href;

tinymce.PluginManager.add("getaepiimageshop", function (ed, url) {

    // Register buttons
    ed.ui.registry.addToggleButton("getaepiimageshop", {
        title: "Insert/Upload Imageshop Image",
        text: "",
        icon: url + "/images/icon.gif",
        onSetup: (buttonApi) => {

            // Add a node change handler, selects the button in the UI when a image is selected
            const editorEventCallback = (e) => {
                var isWebShopImage = e.element.tagName === "IMG" && (ed.dom.getAttrib(e.element, "class").indexOf("ScrImageshopImage") > -1 || ed.dom.getAttrib(e.element, "class").indexOf("mceItem") === -1);
                buttonApi.setActive(isWebShopImage);
            };
            ed.on('NodeChange', editorEventCallback);

            // onSetup should always return the unbind handlers
            return () => editor.off('NodeChange', editorEventCallback);

        },
        onAction: function () {
            try {
                var baseUrl = location.protocol + '//' + location.host;
                var dialogUrl = baseUrl + "/imageshoptinymce/insertimage/?tinyMce=True";
                console.log("Url for dialog: " + dialogUrl);

                if (ed.selection !== null && ed.selection.getNode() !== null && ed.selection.getNode().src !== null)
                    dialogUrl += "&image=" + encodeURIComponent(ed.selection.getNode().src);

                tinymce.activeEditor.windowManager.openUrl({
                    title: 'ImageShop',
                    url: dialogUrl
                });

            } catch (error) {
                console.log("Error setting up button action: " + error);
            }
        }
    });

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

