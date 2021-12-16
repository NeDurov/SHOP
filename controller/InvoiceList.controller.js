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

			this.mGroupFunctions = {
				SupplierName: function (oContext) {
					let name = oContext.getProperty("SupplierName");
					return {
						key: name,
						text: name
					};
				},
				Price: function (oContext) {
					let price = oContext.getProperty("Price");
					let currencyCode = oContext.getProperty("CurrencyCode");
					let key, text;
					if (price <= 100) {
						key = "LE100";
						text = "100 " + currencyCode + " or less";
					} else if (price <= 1000) {
						key = "BT100-1000";
						text = "Between 100 and 1000 " + currencyCode;
					} else {
						key = "GT1000";
						text = "More than 1000 " + currencyCode;
					}
					return {
						key: key,
						text: text
					};
				}
			};
		},

		resetGroupDialog: function (oEvent) {
			this.groupReset = true;
		},

		onFilterInvoices: function (oEvent) {

			// build filter array
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			let oList = this.byId("invoiceList");
			let oBinding = oList.getBinding("items");
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

		//TODO: sort with kg and g
		handleSortButtonPressed: function () {
			this.getViewSettingDialog("shop.view.fragment.SortInvoiceList")
				.then(function (oViewSettingDialog) {
					oViewSettingDialog.open();
				});
		},

		handleFilterButtonPressed: function () {
			this.getViewSettingDialog("shop.view.fragment.FilterInvoiceList")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},

		handleGroupButtonPressed: function () {
			this.getViewSettingDialog("shop.view.fragment.GroupInvoiceList")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
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
		},

		handleFilterDialogConfirm: function (oEvent) {
			let oTable = this.byId("invoiceList"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function (oItem) {
				let aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			oBinding.oList.forEach(function (item) {
				if (item.WeightUnit === "KG") {
					item.WeightMeasure *= 1000;
					item.WeightUnit = "G";
				}
			})

			// apply filter settings
			oBinding.filter(aFilters);

			// ?what with view???
			// console.log(oBinding.oList[0].WeightMeasure / 1000);
			// oBinding.oList.forEach(function (i) {
			// 	if (i.WeightMeasure >= 1000) {
			// 		i.WeightMeasure /= 1000;
			// 		i.WeightUnit = "KG";
			// 		console.log(i.WeightMeasure);
			// 	}
			// });

			// update filter bar
			this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabel").setText(mParams.filterString);
		},

		// ?stack full????
		handleGroupDialogConfirm: function (oEvent) {
			let oTable = this.byId("invoiceList"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				// apply the selected group settings
				oBinding.sort(aGroups);
			} else if (this.groupReset) {
				oBinding.sort();
				this.groupReset = false;
			}
		}
	});

});