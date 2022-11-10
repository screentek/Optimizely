define([
    "dojo",
    "dojo/_base/declare",
    "epi/_Module",
    "epi/dependency",
    "epi/routes"
], function (
    dojo,
    declare,
    _Module,
    dependency,
    routes
) {
    return declare([_Module], {
        initialize: function () {
            try {
                this.inherited(arguments);
                console.log("ImageshopInitializer.js running initialize()");

                var registry = this.resolveDependency("epi.storeregistry");
                //Register the store
                registry.create("imageshopstore", "/imageshopextended/imageshopstore/");
                console.log("ImageshopInitializer: created 'imageshopstore' on path '/imageshopextended/imageshopstore/'")
            } catch (error) {
                console.log("Error ImageshopInitializer.js initialize(): " + error);
            }
        },

        //_getRestPath: function (name) {
        //    try {
        //        console.log("ImageshopInitializer.js running _getRestPath()");
        //        //console.log("This function returns '" + routes.getRestPath({ moduleArea: "App", storeName: name }) +"'")

        //        console.log("Routes: " + JSON.stringify(routes));
        //        return "/imageshopstore/imageshopstore/";
        //        return routes.getRestPath({ moduleArea: "App", storeName: name });
        //    } catch (error) {
        //        console.log("Error ImageshopInitializer.js _getRestPath(): " + error);
        //    }
        //}
    });
});