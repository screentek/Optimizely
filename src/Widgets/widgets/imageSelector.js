define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-class",

        "imageshop-optimizely-plugin/widgets/_ImageSelector",

        "epi/epi",
        'dojo/text!./templates/ImageSelector.html',

        'xstyle/css!./templates/ImageSelector.css'
],
    function (
        declare,
        lang,
        domClass,

        _ImageSelector,

        epi,
        template
    ) {

        return declare("imageshop-optimizely-plugin/widgets/ImageSelector", [_ImageSelector], {
            //
            // Public
            //

            baseClass: "imageExt",
            store: null,
            templateString: template,
            value: null,

            //
            // Life cycle
            //

            postCreate: function () {
                try {
                    this.inherited(arguments);
                    this.showHideAddButton(this.value);

                    if (this.isVideo) {
                        domClass.add(this.noImageNode, 'isVideo');
                    }
                } catch (error) {
                    console.log("Error imageSelector postCreate: " + error);
                }
            },

            postMixInProperties: function () {
                try {
                    this.inherited(arguments);
                } catch (error) {
                    console.log("Error imageSelector postMixInProperties: " + error);
                }
            },

            //
            // Public methods
            //

            clearProperty: function (evt) {
                try {
                    this._setValue(null);
                    this.currentImage = null;
                    this.onFocus();
                } catch (error) {
                    console.log("Error imageSelector clearProperty: " + error);
                }
            },

            loadThumb: function (value) {
                try {
                    if (value == null) {
                        this.thumbContainer.style.display = "none";
                        this.thumbImg.src = "";
                    } else {
                        this.thumbContainer.style.display = "block";
                        this.thumbImg.src = this._getPreviewImageUrl(value);
                    }
                } catch (error) {
                    console.log("Error imageSelector loadThumb: " + error);
                }
            },

            onImageSelected: function () {
                try {
                    this.inherited(arguments);
                    this._setValue(this.currentImage);
                } catch (error) {
                    console.log("Error imageSelector onImageSelected: " + error);
                }
            },

            showHideAddButton: function (value) {
                try {
                    if (value == null) {
                        this.noImageNode.style.display = "block";
                    } else {
                        this.noImageNode.style.display = "none";
                    }
                } catch (error) {
                    console.log("Error imageSelector showHideAddButton: " + error);
                }
            },

            //
            // Private methods
            //

            _getPreviewImageUrl: function (image) {
                try {
                    if (this.previewCropName) {
                        return image.url + "-" + this.previewCropName;
                    }

                    return image.url;
                } catch (error) {
                    console.log("Error imageSelector _getPreviewImageUrl: " + error);
                }
            },

            _setValueAttr: function (value) {
                try {
                    this.currentImage = value;
                    this._set("value", this.currentImage);
                    this.loadThumb(value);
                    this.showHideAddButton(value);
                } catch (error) {
                    console.log("Error imageSelector _setValueAttr: " + error);
                }
            },

            _setValue: function (value) {
                try {
                    if (this._started && epi.areEqual(this.value, value)) {
                        return;
                    }

                    this._set("value", value);
                    this.loadThumb(value);
                    this.showHideAddButton(value);

                    if (this._started && this.validate()) {
                        // Trigger change event
                        this.onChange(this.value);
                    }
                } catch (error) {
                    console.log("Error imageSelector _setValue: " + error);
                }
            }
        });
    });