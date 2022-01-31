/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zsd_031_hotel_detail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
