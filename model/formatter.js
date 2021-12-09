sap.ui.define(function () {
	"use strict";

	var Formatter = {

		randomBoolean: function () {
			return (Math.random() < 0.5);
		},

		statusText: function (sStatus) {

			switch (sStatus) {
				case "Available":
					return 1;
				case "sold out":
					return 3;
				default:
					return sStatus;
			}
		},

		statusPrice: function (pPrice) {
			if (pPrice > 550) {
				return "Error";
			} else { return "Success" }
		},

		statusWeight: function (wWeight, wWeight1) {
			if (wWeight1 === "KG") {
				if (wWeight > 10) {
					return "Error";
				} else {
					if (wWeight < 1) {
						return "Success";
					}
				}
			} else { return "Success"; }
		}
	};

	return Formatter;

}, /* bExport= */ true);