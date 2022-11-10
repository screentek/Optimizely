define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-class",

        "geta-epi-imageshop/widgets/_ImageSelector",

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

        return declare("geta-epi-imageshop/widgets/ImageSelector", [_ImageSelector], {
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
                    console.log("imageSelector.js running postCreate()");

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
                    console.log("imageSelector.js running postMixInProperties()");
                } catch (error) {
                    console.log("Error imageSelector postMixInProperties: " + error);
                }
            },

            //
            // Public methods
            //

            clearProperty: function (evt) {
                try {
                    console.log("imageSelector.js running clearProperty()");
                    this._setValue(null);
                    this.currentImage = null;
                    this.onFocus();
                } catch (error) {
                    console.log("Error imageSelector clearProperty: " + error);
                }
            },

            loadThumb: function (value) {
                try {
                    console.log("imageSelector.js running loadThumb()");
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
                    console.log("imageSelector.js running onImageSelected()");
                    this.inherited(arguments);
                    this._setValue(this.currentImage);
                } catch (error) {
                    console.log("Error imageSelector onImageSelected: " + error);
                }
            },

            showHideAddButton: function (value) {
                try {
                    console.log("imageSelector.js running showHideAddButton()");
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
                    console.log("imageSelector.js running _getPreviewImageUrl()");
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
                    console.log("imageSelector.js running _setValueAttr()");
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
                    console.log("imageSelector.js running _setValue()");
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