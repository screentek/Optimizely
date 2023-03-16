"use strict";
var tinymce = tinymce || {};

var currentUrl = location.href;

tinymce.PluginManager.add("getaepiimageshop", function (ed, url) {
    var imageNode;

    if (tinymce.majorVersion >= 5) {

    }
    else {
        // Register commands
        ed.addCommand('mcegetaepiimageshop', function () {

            try {
                var baseUrl = location.protocol + '//' + location.host;
                var dialogUrl = baseUrl + "/imageshoptinymce/insertimage/?tinyMce=True";
                console.log("Url for dialog: " + dialogUrl);

                if (ed.selection !== null && ed.selection.getNode() !== null && ed.selection.getNode().src !== null)
                    dialogUrl += "&image=" + encodeURIComponent(ed.selection.getNode().src);

                ed.windowManager.open({
                    file: dialogUrl,
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
            title: "Insert/Upload Imageshop Image",
            cmd: "mcegetaepiimageshop",
            image: url + "/images/icon.gif",
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

