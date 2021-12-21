sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
], function (UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("shop.Component", {
		metadata: {
			intarfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {

			UIComponent.prototype.init.apply(this, arguments);

			let oData = {
				recipient: {
					name: "World"
				}
			};
			let oModel = new JSONModel(oData);
			this.setModel(oModel);

			this.getRouter().initialize();
		}
	});
});