/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["zsd031hoteldetail/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
