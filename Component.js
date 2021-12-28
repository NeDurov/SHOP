sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("shop.Component", {
		metadata: {
			intarfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {

			UIComponent.prototype.init.apply(this, arguments);

			let cartEntries = {Cart:[]};
			let oCartModel = new JSONModel(cartEntries);
			this.setModel(oCartModel);

			this.getRouter().initialize();
		}
	});
});