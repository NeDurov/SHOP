sap.ui.define([
	'../model/formatter',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (formatter, Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("shop.controller.App", {

		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices: function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});

});