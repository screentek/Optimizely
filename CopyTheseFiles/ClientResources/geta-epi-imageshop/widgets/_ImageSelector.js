define([
        "dojo/_base/array",
        "dojo/_base/connect",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/when",
        "dojo/on",

        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/_OnDijitClickMixin",

        "epi/shell/request/xhr",
        "epi/shell/widget/_ValueRequiredMixin",
        "epi-cms/widget/_HasChildDialogMixin",

        "epi/epi",
        "epi/dependency"
],
    function (
        array,
        connect,
        declare,
        lang,
        when,
        on,

        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _OnDijitClickMixin,

        xhr,
        _ValueRequiredMixin,
        _HasChildDialogMixin,

        epi,
        dependency
    ) {

        return declare("geta-epi-imageshop/widgets/_ImageSelector", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ValueRequiredMixin, _HasChildDialogMixin, _OnDijitClickMixin], {
            baseUrl: null,
            browserClass: "imageshop-browser",
            closeBtnId: "imageshop-frame-container-close",
            containerId: "imageshop-frame-container",
            cropName: "",
            currentImage: null,
            innerClass: "imageshop-frame-wrapper",
            iframeId: "imageshop-frame",
            messageReceivedCallback: null,
            selectCurrentImage: true,
            store: null,

            //
            // Life cycle
            //

            postCreate: function () {
                try {
                    this.inherited(arguments);
                    console.log("_imageSelector.js running postCreate()");
                    this.store = dependency.resolve('epi.storeregistry').get('imageshopstore');
                } catch (error) {
                    console.log("Error _imageSelector postCreate: " + error);
                }
            },

            //
            // Public methods
            //

            closeWindow: function (evt) {
                try {
                    console.log("_imageSelector.js running closeWindow()");
                    if (window.removeEventListener) {
                        removeEventListener('message', this.messageReceivedCallback, false);
                    } else {
                        detachEvent("onmessage", this.messageReceivedCallback);
                    }

                    this.messageReceivedCallback = null;
                    this.destroyFrame();
                    this.isShowingChildDialog = false;
                } catch (error) {
                    console.log("Error _imageSelector closeWindow: " + error);
                }
            },

            createFrame: function () {
                try {
                    console.log("_imageSelector.js running createFrame()");
                    var root = document.body;
                    var div = document.createElement("div");
                    div.setAttribute("id", this.containerId);
                    div.setAttribute("class", this.containerId);

                    var innerContainer = document.createElement("div");
                    innerContainer.setAttribute("class", this.innerClass + " " + this.browserClass);

                    var ifrm = document.createElement("iframe");
                    var ifrmUrl = this.baseUrl;

                    if (this.selectCurrentImage && this.currentImage != null && this.currentImage.url) {
                        ifrmUrl += "&IMAGE=" + encodeURI(this.currentImage.url);
                    }

                    ifrm.setAttribute("src", ifrmUrl);
                    ifrm.setAttribute("id", this.iframeId);
                    ifrm.setAttribute("frameborder", "0");

                    var closeBtn = document.createElement("a");
                    closeBtn.setAttribute("class", this.closeBtnId);
                    closeBtn.setAttribute("id", this.closeBtnId);
                    closeBtn.setAttribute("title", "Close window");

                    closeBtn.onclick = lang.hitch(this, function () {
                        this.closeWindow();
                    });

                    innerContainer.appendChild(ifrm);
                    innerContainer.appendChild(closeBtn);

                    div.appendChild(innerContainer);
                    root.appendChild(div);
                } catch (error) {
                    console.log("Error _imageSelector createFrame: " + error);
                }
            },

            destroyFrame: function () {
                try {
                    console.log("_imageSelector.js running destroyFrame()");
                    var container = document.getElementById(this.containerId);
                    container.parentNode.removeChild(container);
                } catch (error) {
                    console.log("Error _imageSelector destroyFrame: " + error);
                }
            },

            onImageSelected: function (image) {
            },

            onMessageReceived: function (event) {
                try {
                    console.log("_imageSelector.js running onMessageReceived()");
                    this.setBasicImage(event.data);

                    console.log("STORE: " + this.store);
                    xhr.get(this.store.target + '?permalink=' + encodeURIComponent(this.currentImage.url), {
                        handleAs: 'json'
                    }).then(lang.hitch(this, function (extendedData) {
                        window.console && console.log('extendeddata', extendedData);
                        this.setExtendedImage(extendedData);
                        this.onImageSelected(this.currentImage);
                        this.closeWindow();
                    }), lang.hitch(this, function (err) {
                        alert("WebService call to fetch extended metadata failed. Using basic image data (url, credits, width and height). Error is: " + err);
                        this.onImageSelected(this.currentImage);
                        this.closeWindow();
                    }));
                } catch (error) {
                    console.log("Error _imageSelector onMessageReceived: " + error);
                }
            },

            openWindow: function (evt) {
                try {
                    console.log("_imageSelector.js running openWindow()");
                    this.isShowingChildDialog = true;

                    this.messageReceivedCallback = lang.hitch(this, this.onMessageReceived);

                    if (window.addEventListener) {
                        window.addEventListener("message", this.messageReceivedCallback, false);
                    } else {
                        window.attachEvent("onmessage", this.messageReceivedCallback);
                    }

                    this.createFrame();
                } catch (error) {
                    console.log("Error _imageSelector openWindow: " + error);
                }
            },

            setBasicImage: function (data) {
                try {
                    console.log("_imageSelector.js running setBasicImage()");
                    var imageData = JSON.parse(data.split(";")[0]);
                    var textData = imageData.text[this.preferredLanguage];
                    window.console && console.log(imageData);

                    this.currentImage = {
                        code: imageData.code,
                        url: imageData.image.file,
                        width: imageData.image.width,
                        height: imageData.image.height,
                        changed: new Date(),
                        cropName: this.cropName
                    };

                    if (textData) {
                        this.currentImage.name = textData.title;
                        this.currentImage.credits = textData.credits;
                        this.currentImage.description = textData.description;
                        this.currentImage.rights = textData.rights;
                        this.currentImage.tags = textData.tags;
                    }

                    if (imageData.videos) {
                        this.currentImage.aspectRatio = imageData.aspectratio;
                        this.currentImage.videos = imageData.videos;
                    }

                    window.console && console.log(this.currentImage);
                } catch (error) {
                    console.log("Error _imageSelector setBasicImage: " + error);
                }
            },

            setExtendedImage: function (data) {
                try {
                    console.log("_imageSelector.js running setExtendedImage()");
                    this.currentImage = this.currentImage || {};

                    this.currentImage.documentId = data.documentID;
                    this.currentImage.comment = data.comment;
                    this.currentImage.isImage = data.isImage;
                    this.currentImage.isVideo = data.isVideo;
                    this.currentImage.authorName = data.authorName;
                } catch (error) {
                    console.log("Error _imageSelector setExtendedImage: " + error);
                }
            }
        });
    });