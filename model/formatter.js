sap.ui.define(function () {
	"use strict";

	var Formatter = {

		randomBoolean: function () {
			return (Math.random() < 0.5);
		},
		statusText: function (sStatus) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			switch (sStatus) {
				case "A":
					return oResourceBundle.getText("invoiceStatusA");
				case "B":
					return oResourceBundle.getText("invoiceStatusB");
				default:
					return sStatus;
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);