define([
        "dojo/_base/array",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/on",

        "dijit/form/Button",

        "imageshop-optimizely-plugin/widgets/_ImageSelector",

        "epi/epi",
        "epi/dependency",

        "dojo/text!./templates/ImageCollection.html",
        "xstyle/css!./templates/ImageSelector.css",
        "xstyle/css!./templates/ImageCollection.css",
        "xstyle/css!//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
],
    function (
        array,
        declare,
        lang,
        dom,
        domConstruct,
        domClass,
        on,

        Button,

        _ImageSelector,

        epi,
        dependency,

        template
    ) {
        return declare("imageshop-optimizely-plugin/widgets/ImageCollection", [_ImageSelector], {
            //
            // Private
            //

            _imageCollection: null,

            //
            // Public
            //

            multiple: true,
            previewCropName: null,
            selectCurrentImage: false,
            templateString: template,
            value: null,

            // 
            // Life cycle
            //

            constructor: function () {
                try {
                    this._imageCollection = [];
                    this.inherited(arguments);
                } catch (error) {
                    console.log("Error ImageCollection constructor: " + error);
                }
            },

            destroy: function () {
                try {
                    var _a;
                    while (_a = this._imageCollection.pop()) {
                    }

                    this.inherited(arguments);
                } catch (error) {
                    console.log("Error ImageCollection destroy: " + error);
                }
            },

            postCreate: function () {
                try {
                    this.inherited(arguments);

                    if (this.isVideo) {
                        domClass.add(this.selectImageNode, 'isVideo');
                    }
                } catch (error) {
                    console.log("Error ImageCollection postCreate: " + error);
                }
            },

            //
            // Public methods
            //

            onChange: function (value) {
            },

            onImageSelected: function (image) {
                try {
                    this.inherited(arguments);

                    this._addImageToCollection(image);
                    this._onWidgetChanged();
                } catch (error) {
                    console.log("Error ImageCollection onImageSelected: " + error);
                }
            },

            updateValue: function () {
                try {
                    var propertyValue = [];

                    array.forEach(this._imageCollection, function(entry) {
                        propertyValue.push(entry.image);
                    });

                    if (this._started && epi.areEqual(this.value, propertyValue)) {
                        return;
                    }

                    this._updateSortIcons();
                    this._set("value", propertyValue);
                    this.onBlur();
                } catch (error) {
                    console.log("Error ImageCollection updateValue: " + error);
                }
            },

            //
            // Private methods
            //

            _addHtmlNodesForImages: function (imageCollection) {
                try {
                    for (var i = 0; i < imageCollection.length; i++) {
                        var image = imageCollection[i];
                        this._addImageToCollection(image);
                    }  
                } catch (error) {
                    console.log("Error ImageCollection _addHtmlNodesForImages: " + error);
                }
            },

            _addHtmlNodesForImage: function (image) {
                try {
                    var li = domConstruct.create("li", { "class": "geta-image-list-item clearfix" }, this.imageCollectionNode);
                    var imageWrapperNode = domConstruct.create("div", { "class": "geta-image-wrapper" }, li);

                    domConstruct.create("img", { "class": "geta-image", "src": this._getPreviewImageUrl(image) }, imageWrapperNode);
                    domConstruct.create("a", { "href": image.url, "class": "geta-image-url", "innerHTML": this._getPreviewImageUrl(image) }, li);

                    var actionsWrapperNode = domConstruct.create("div", { "class": "geta-actions-wrapper" }, li);

                    // Sort up button
                    var sortUpLink = domConstruct.create("a", { href: "javascript:void(0)" }, actionsWrapperNode);
                    var sortUpIcon = domConstruct.create("i", null, sortUpLink);
                    sortUpIcon.setAttribute("class", "fa fa-fw fa-arrow-up");

                    // Sort down button
                    var sortDownLink = domConstruct.create("a", { href: "javascript:void(0)" }, actionsWrapperNode);
                    var sortDownIcon = domConstruct.create("i", null, sortDownLink);
                    sortDownIcon.setAttribute("class", "fa fa-fw fa-arrow-down");

                    on(sortUpLink, "click", lang.hitch(this, function (e) {
                        if (domClass.contains(sortUpLink, "disabled")) {
                            return false;
                        }

                        this._sortNodeUp(li);
                        return false;
                    }));

                    on(sortDownLink, "click", lang.hitch(this, function (e) {
                        if (domClass.contains(sortDownLink, "disabled")) {
                            return false;
                        }

                        this._sortNodeDown(li);
                        return false;
                    }));

                    var removeButton = new Button({
                        label: "X",
                        scope: this,
                        container: li
                    });

                    removeButton.on("click", lang.hitch(this, function() {
                        this._removeImageNode(li);
                    }));

                    removeButton.placeAt(actionsWrapperNode);

                    li.sortUpLink = sortUpLink;
                    li.sortDownLink = sortDownLink;

                    return li;
                } catch (error) {
                    console.log("Error ImageCollection _addHtmlNodesForImage: " + error);
                }
            },

            _addImageToCollection: function (image) {
                try {
                    if (image == null) {
                        return null;
                    }

                    var node = this._addHtmlNodesForImage(image);
                    var o = {
                        image: image,
                        node: node
                    };

                    this._imageCollection.push(o);
                    return o;
                } catch (error) {
                    console.log("Error ImageCollection _addImageToCollection: " + error);
                }
            },

            _getNodeIndex: function (node) {
                try {
                    for (var i = 0; i < this._imageCollection.length; i++) {
                        var image = this._imageCollection[i];

                        if (image.node == node) {
                            return i;
                        }
                    }

                    return -1;
                } catch (error) {
                    console.log("Error ImageCollection _getNodeIndex: " + error);
                }
            },

            _getPreviewImageUrl: function (image) {
                try {
                    if (this.previewCropName) {
                        return image.url + "-" + this.previewCropName;
                    }

                    return image.url;
                } catch (error) {
                    console.log("Error ImageCollection _getPreviewImageUrl: " + error);
                }
            },

            _moveNode: function (index, step) {
                try {
                    var newIndex = index + step;
                    this._imageCollection.splice(newIndex, 0, this._imageCollection.splice(index, 1)[0]);
                } catch (error) {
                    console.log("Error ImageCollection _moveNode: " + error);
                }
            },

            _onWidgetChanged: function () {
                try {
                    this.inherited(arguments);
                    this.updateValue();
                } catch (error) {
                    console.log("Error ImageCollection _onWidgetChanged: " + error);
                }
            },

            _removeImageNode: function (node) {
                try {
                    for (var i = this._imageCollection.length - 1; i >= 0; i--) {
                        var image = this._imageCollection[i];

                        if (image.node == node) {
                            this._imageCollection.splice(i, 1);
                            domConstruct.destroy(image.node);
                            this._onWidgetChanged();
                            break;
                        }
                    }
                } catch (error) {
                    console.log("Error ImageCollection _removeImageNode: " + error);
                }
            },

            _setValueAttr: function (val) {
                try {
                    this._set("value", val);

                    if (!val || !(val instanceof Array)) {
                        this._set("value", []);
                    }

                    if (this._imageCollection.length == 0) {
                        array.forEach(this.value, this._addImageToCollection, this);
                        this._updateSortIcons();
                    }
                } catch (error) {
                    console.log("Error ImageCollection _setValueAttr: " + error);
                }
            },

            _sortNodeUp: function (node) {
                try {
                    var prevNode = node.previousElementSibling;

                    if (prevNode != null) {
                        this._moveNode(this._getNodeIndex(node), -1);
                        var parent = node.parentElement;
                        parent.insertBefore(node, prevNode);
                        this._onWidgetChanged();
                    }
                } catch (error) {
                    console.log("Error ImageCollection _sortNodeUp: " + error);
                }
            },

            _sortNodeDown: function (node) {
                try {
                    var nextNode = node.nextElementSibling;

                    if (nextNode != null) {
                        this._moveNode(this._getNodeIndex(node), 1);
                        var parent = node.parentElement;

                        if (nextNode == parent.lastChild) {
                            parent.appendChild(node);
                        } else {
                            parent.insertBefore(node, nextNode.nextElementSibling);
                        }

                        this._onWidgetChanged();
                    }
                } catch (error) {
                    console.log("Error ImageCollection _sortNodeDown: " + error);
                }
            },

            _updateSortIcons: function () {
                try {
                    if (this._imageCollection.length < 1) {
                        return;
                    }

                    var firstIndex = 0;
                    var lastIndex = this._imageCollection.length - 1;
                    var firstItem = this._imageCollection[firstIndex];

                    array.forEach(this._imageCollection, function (image) {
                        domClass.remove(image.node.sortUpLink, "disabled");
                        domClass.remove(image.node.sortDownLink, "disabled");
                    });

                    domClass.add(firstItem.node.sortUpLink, "disabled");

                    if (lastIndex > firstIndex) {
                        var lastItem = this._imageCollection[lastIndex];
                        domClass.add(lastItem.node.sortDownLink, "disabled");
                    } else {
                        domClass.add(firstItem.node.sortDownLink, "disabled");
                    }
                } catch (error) {
                    console.log("Error ImageCollection _updateSortIcons: " + error);
                }
            }
        });
    });