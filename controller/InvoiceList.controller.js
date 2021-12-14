sap.ui.define([
	'../model/formatter',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/ui/core/Fragment',
	'sap/ui/Device'

], function (formatter, Controller, JSONModel, Filter, FilterOperator, Sorter, Fragment, Device) {
	"use strict";

	return Controller.extend("shop.controller.App", {

		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			this._mViewSettingDialog = {};
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
		},

		getViewSettingDialog: function (sDialogFragmentName) {
			let pDialog = this._mViewSettingDialog[sDialogFragmentName];

			if (!pDialog) {
				pDialog = Fragment.load({
					id: this.getView().getId(),
					name: sDialogFragmentName,
					controller: this
				}).then(function (oDialog) {
					if (Device.system.desktop) {
						oDialog.addStyleClass("sapUiSizeCompact")
					}
					return oDialog;
				});
				this._mViewSettingDialog[sDialogFragmentName] = pDialog;
			}
			return pDialog;
		},

		handleSortButtonPressed: function () {
			this.getViewSettingDialog("shop.view.SortInvoiceList").then(function (oViewSettingDialog) {
				oViewSettingDialog.open();
			});
		},

		handleSortDialogConfirm: function (oEvent) {
			let oTable = this.byId("invoiceList"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			oBinding.sort(aSorters);
		}
	});

});