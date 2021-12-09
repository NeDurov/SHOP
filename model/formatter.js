sap.ui.define(function () {
	"use strict";

	var Formatter = {

		randomBoolean: function () {
			return (Math.random() < 0.5);
		},
		statusText: function (sStatus) {

			switch (sStatus) {
				case "Available":
					return 9;
				case "sold out":
					return 3;
				default:
					return sStatus;
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);