//@ui5-bundle zsd031hoteldetail/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"zsd031hoteldetail/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","zsd031hoteldetail/model/models"],function(e,t,i){"use strict";return e.extend("zsd031hoteldetail.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"zsd031hoteldetail/controller/App.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/json/JSONModel"],function(o,e){"use strict";return o.extend("zsd031hoteldetail.controller.App",{onInit:function(){}})});
},
	"zsd031hoteldetail/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(e,t){"use strict";return e.extend("zsd031hoteldetail.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("list",{},true)}}})});
},
	"zsd031hoteldetail/controller/CreateBooking.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/format/DateFormat","sap/m/library","sap/m/MessageBox"],function(t,e,o,n,i){"use strict";var a;return t.extend("zsd031hoteldetail.controller.CreateBooking",{onInit:function(){var t=this.getOwnerComponent().getRouter();t.getRoute("CreateBooking").attachMatched(function(t){this._selectItemWithId(t.getParameter("arguments").hotelId)},this);var e=new Date;console.log(e)},_selectItemWithId:function(t){a=parseInt(t);const o=new e;let n={HotelId:a,Id:0,Name:"",Firstname:"",Startdate:"2022.01.01",Nights:0,Email:""};o.setProperty("/booking",n);this.getView().setModel(o)},onCreatePressed:function(){let t=this.getView().getModel().getProperty("/booking");let e=true;t.Nights=parseInt(t.Nights);let n=t.Startdate;const a=o.getDateTimeInstance({pattern:"dd/MM/yyyy"});try{let e=n.split(".");let o=e[0]+"-"+e[1]+"-"+e[2];t.Startdate=a.parse(o+"T00:00:00")}catch(t){e=false}if(!e||t.Startdate==null){i.show("Use the date picker to choose a valid date.",{icon:i.Icon.INFORMATION,title:"Use the date picker",actions:[i.Action.OK],onClose:function(t){/ * do something * /}})}else if(t.Startdate<=new Date){i.show("The date that you'll arrive, can only be in the future.",{icon:i.Icon.INFORMATION,title:"Date can only be in the future.",actions:[i.Action.OK],onClose:function(t){/ * do something * /}})}else if(isNaN(t.Nights)||t.Nights===0){i.show("Fill in a number other than 0 in the field Nights.",{icon:i.Icon.INFORMATION,title:"Fill in a number",actions:[i.Action.OK],onClose:function(t){/ * do something * /}})}else{this.getOwnerComponent().getModel().create("/bookingSet",t);this.navToDetail()}},navToDetail:function(){this.getRouter().navTo("Detail",{hotelId:a})}})});
},
	"zsd031hoteldetail/controller/CreateContact.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/format/DateFormat","sap/m/library"],function(t,e,o,n){"use strict";var a;return t.extend("zsd031hoteldetail.controller.CreateContact",{onInit:function(){var t=this.getOwnerComponent().getRouter();t.getRoute("CreateContact").attachMatched(function(t){this._selectItemWithId(t.getParameter("arguments").hotelId)},this)},_selectItemWithId:function(t){a=parseInt(t);const o=new e;let n={HotelId:a,Id:0,Name:"",Firstname:"",Email:""};o.setProperty("/contact",n);this.getView().setModel(o)},onCreatePressed:function(){let t=this.getView().getModel().getProperty("/contact");this.getOwnerComponent().getModel().create("/contactSet",t);this.navToDetail()},navToDetail:function(){this.getRouter().navTo("Detail",{hotelId:a})}})});
},
	"zsd031hoteldetail/controller/Detail.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/library"],function(t,e,o){"use strict";const n=0;let i;return t.extend("zsd031hoteldetail.controller.Detail",{onInit:function(){var t=this.getOwnerComponent().getRouter();t.getRoute("Detail").attachMatched(function(t){this.hotelId=t.getParameter("arguments").hotelId;this._selectItemWithId(t.getParameter("arguments").hotelId)},this)},_selectItemWithId:function(t){var o=this.getOwnerComponent().getModel();console.log(o);var n=this.getView();o.read("/hotelSet("+t+")",{urlParameters:{$expand:"hotelContact,hotelBooking"},success:function(t,o){const s=new e;s.setProperty("/hotel",t);n.setModel(s);i=t.Description;let r=t.hotelBooking.results;s.setProperty("/bookings",r);let l=t.hotelContact.results;s.setProperty("/contacts",l)},error:function(t){console.log(t)}})},addBookingPressed:function(t){this.getRouter().navTo("CreateBooking",{hotelId:this.hotelId})},addContactPressed:function(t){this.getRouter().navTo("CreateContact",{hotelId:this.hotelId})},onInputChange:function(t){if(this.getView().byId("editDescriptionButton").getEnabled()==false){this.getView().byId("editDescriptionButton").setEnabled(true)}},onUpdatePressed:function(){let t=this.getView().getModel().getProperty("/hotel");let e={Id:t.Id,Name:t.Name,Street:t.Street,City:t.City,Country:t.Country,Description:t.Description};i=t.Description;this.getOwnerComponent().getModel().update("/hotelSet("+e.Id+")",e,{merge:false,success:function(){console.log("succes")},error:function(t){console.log(t)}});this.getView().byId("editDescriptionButton").setEnabled(false)},onCancelPressed:function(){let t=this.getView().getModel().getProperty("/hotel");console.log(t.Description);this.getView().byId("hotelDescriptionInput").setValue(i)},onBookingChange:function(t){var e=t.getSource(),o=t.getParameter("selected");if(!(e.getMode()==="MultiSelect"&&!o)){this._showBookingDetail(t.getParameter("listItem")||t.getSource())}},onContactChange:function(t){var e=t.getSource(),o=t.getParameter("selected");if(!(e.getMode()==="MultiSelect"&&!o)){this._showContactDetail(t.getParameter("listItem")||t.getSource())}},_showContactDetail:function(t){this.getRouter().navTo("UpdateContact",{contactId:t.getBindingContext().getProperty("Id")})},_showBookingDetail:function(t){this.getRouter().navTo("UpdateBooking",{bookingId:t.getBindingContext().getProperty("Id")})}})});
},
	"zsd031hoteldetail/controller/UpdateBooking.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/library","sap/m/MessageBox"],function(e,t,o,n){"use strict";var i;var s;return e.extend("zsd031hoteldetail.controller.UpdateBooking",{onInit:function(){var e=this.getOwnerComponent().getRouter();e.getRoute("UpdateBooking").attachMatched(function(e){this._selectItemWithId(e.getParameter("arguments").bookingId)},this)},_selectItemWithId:function(e){var o=this.getOwnerComponent().getModel();var n=this.getView();o.read("/bookingSet("+e+")",{success:function(e,o){const a=new t;a.setProperty("/toUpdateBooking",e);i=e.HotelId;s=e.Startdate;n.setModel(a);console.log(e.Startdate)},error:function(e){console.log(e)}})},onUpdatePressed:function(){const e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"dd/MM/yyyy"});let t=true;let o=this.getView().getModel().getProperty("/toUpdateBooking");let i=""+o.Startdate;console.log(o.Startdate);if(o.Startdate!=s){try{let t=i.split(".");let n=t[0]+"-"+t[1]+"-"+t[2];o.Startdate=e.parse(n+"T05:00:00");console.log(o.Startdate)}catch(e){t=false}}o.Nights=parseInt(o.Nights);if(!t||o.Startdate==null){console.log("no valid date");n.show("Use the date picker to choose a valid date.",{icon:n.Icon.INFORMATION,title:"Use the date picker",actions:[n.Action.OK],onClose:function(e){/ * do something * /}})}else if(o.Startdate<=new Date){n.show("The date that you'll arrive, can only be in the future.",{icon:n.Icon.INFORMATION,title:"Date can only be in the future.",actions:[n.Action.OK],onClose:function(e){/ * do something * /}})}else if(isNaN(o.Nights||o.Nights==0)){n.show("Fill in a number other than 0 in the field Nights.",{icon:n.Icon.INFORMATION,title:"Fill in a number",actions:[n.Action.OK],onClose:function(e){/ * do something * /}})}else{this.getOwnerComponent().getModel().update("/bookingSet("+o.Id+")",o,{merge:true,success:function(){console.log("succes")},error:function(e){console.log(e)}});console.log(o.HotelId);this.navToDetail()}},onDeletePressed:function(){let e=this.getView().getModel().getProperty("/toUpdateBooking");this.getOwnerComponent().getModel().remove("/bookingSet("+e.Id+")",{success:function(){console.log("Booking is deleted.")},error:function(e){console.log(e)}});this.navToDetail()},navToDetail:function(){this.getRouter().navTo("Detail",{hotelId:i})}})});
},
	"zsd031hoteldetail/controller/UpdateContact.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/library","sap/m/MessageBox"],function(t,e,o,n){"use strict";var c;return t.extend("zsd031hoteldetail.controller.UpdateContact",{onInit:function(){var t=this.getOwnerComponent().getRouter();t.getRoute("UpdateContact").attachMatched(function(t){this._selectItemWithId(t.getParameter("arguments").contactId)},this)},_selectItemWithId:function(t){var o=this.getOwnerComponent().getModel();var n=this.getView();o.read("/contactSet("+t+")",{success:function(t,o){const s=new e;s.setProperty("/toUpdateContact",t);c=t.HotelId;n.setModel(s)},error:function(t){console.log(t)}})},onUpdatePressed:function(){let t=this.getView().getModel().getProperty("/toUpdateContact");this.getOwnerComponent().getModel().update("/contactSet("+t.Id+")",t,{merge:true,success:function(){console.log("succes")},error:function(t){console.log(t);n.show("The selected contact isn't updated.",{icon:n.Icon.INFORMATION,title:"Use the date picker",actions:[n.Action.OK],onClose:function(t){/ * do something * /}})}});this.navToDetail()},onDeletePressed:function(){let t=this.getView().getModel().getProperty("/toUpdateContact");this.getOwnerComponent().getModel().remove("/contactSet("+t.Id+")",{success:function(){console.log("Contact is deleted.")},error:function(t){console.log(t);n.show("The selected contact isn't deleted.",{icon:n.Icon.INFORMATION,title:"Use the date picker",actions:[n.Action.OK],onClose:function(t){/ * do something * /}})}});this.navToDetail()},navToDetail:function(){this.getRouter().navTo("Detail",{hotelId:c})}})});
},
	"zsd031hoteldetail/i18n/i18n.properties":'# This is the resource bundle for zsd031hoteldetail\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Hotel Detail\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=Hotel Detail',
	"zsd031hoteldetail/localService/mockserver.js":function(){sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,a){"use strict";var o,i="zsd031hoteldetail/",n=i+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(i+"manifest.json"),l=new t(p);l.attachRequestCompleted(function(){var t=new r(window.location.href),c=sap.ui.require.toUrl(n),p=l.getProperty("/sap.app/dataSources/mainService"),f=sap.ui.require.toUrl(i+p.settings.localUri),d=p.uri&&new URI(p.uri).absoluteTo(sap.ui.require.toUrl(i)).toString();if(!o){o=new e({rootUri:d})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(f,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=o.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}o.setRequests(m);o.start();a.info("Running the app with mock data");s()});l.attachRequestFailed(function(){var e="Failed to load application manifest";a.error(e);c(new Error(e))})})},getMockServer:function(){return o}};return s});
},
	"zsd031hoteldetail/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"zsd031hoteldetail","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"mainService":{"uri":"/sap/opu/odata/sap/ZSD_031_HOTEL_GW_SRV/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.97.0","libs":{"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"zsd031hoteldetail.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"zsd031hoteldetail.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"Detail","pattern":"Detail/{hotelId}","target":["Detail"]},{"name":"CreateBooking","pattern":"CreateBooking/{hotelId}","target":["CreateBooking"]},{"name":"CreateContact","pattern":"CreateContact/{hotelId}","target":["CreateContact"]},{"name":"UpdateBooking","pattern":"UpdateBooking/{bookingId}","target":["UpdateBooking"]},{"name":"UpdateContact","pattern":"UpdateContact/{contactId}","target":["UpdateContact"]}],"targets":{"TargetApp":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"App","viewName":"App"},"Detail":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"detail","viewName":"Detail"},"CreateBooking":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"createBooking","viewName":"CreateBooking"},"CreateContact":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"createContact","viewName":"CreateContact"},"UpdateBooking":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"updateBooking","viewName":"UpdateBooking"},"UpdateContact":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"updateContact","viewName":"UpdateContact"}}},"rootView":{"viewName":"zsd031hoteldetail.view.App","type":"XML","async":true,"id":"app"}}}',
	"zsd031hoteldetail/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"zsd031hoteldetail/utils/locate-reuse-libs.js":'(function(e){var t=function(e){var t=e;var n="";var a=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];function r(e,t){Object.keys(e).forEach(function(e){if(!a.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t}return new Promise(function(a,i){$.ajax(t).done(function(e){if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=r(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=r(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=r(e["sap.ui5"].componentUsages,n)}}a(n)}).fail(function(t){i(new Error("Could not fetch manifest at \'"+e))})})};e.registerComponentDependencyPaths=function(e){return t(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}})}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=scripts[scripts.length-1];var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")});if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")})}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"zsd031hoteldetail/view/App.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.App"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns="sap.m"\n><Shell id="shell"><App id="app"><pages><Page id="page" title="Hotel Details1"><content /></Page></pages></App></Shell></mvc:View>\n',
	"zsd031hoteldetail/view/CreateBooking.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.CreateBooking"\n\txmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="createPage"\n\t\tbusy="{detailView>/busy}"\n        showFooter="true"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title\n                id="createBookingTitle"\n\t\t\t\ttext="Create Booking"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:content><f:SimpleForm id="SimpleFormChange354wide"\n\t\t\teditable="true"\n\t\t\tlayout="ResponsiveGridLayout"\n\t\t\tlabelSpanXL="4"\n\t\t\tlabelSpanL="3"\n\t\t\tlabelSpanM="4"\n\t\t\tlabelSpanS="12"\n\t\t\tadjustLabelSpan="false"\n\t\t\temptySpanXL="0"\n\t\t\temptySpanL="4"\n\t\t\temptySpanM="0"\n\t\t\temptySpanS="0"\n\t\t\tcolumnsXL="2"\n\t\t\tcolumnsL="1"\n\t\t\tcolumnsM="1"\n\t\t\tsingleContainerFullSize="false"><f:content><Label text="Name" /><Input id="bookingName" value="{/booking/Name}" /><Label text="Firstname" /><Input id="bookingFirstname" value="{/booking/Firstname}" /><Label text="Startdate" /><DatePicker\n                    id="startDate"\n                    valueFormat="yyyy.MM.dd"\n                    placeholder="Enter Date"\n                    change="handleChange"\n                    value="{/booking/Startdate}"\n                    class="sapUiSmallMarginBottom"/><Label text="Nights" /><Input id="nights" type="Number" value="{/booking/Nights}" /><Label text="Email" /><Input id="Email" value="{/booking/Email}" /></f:content></f:SimpleForm></semantic:content><semantic:footerCustomActions><Button text="Save" id="createBookingButton" press=".onCreatePressed"/><Button text="Cancel" id="cancelBookingButton" press="navToDetail" /></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>\n\n',
	"zsd031hoteldetail/view/CreateContact.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.CreateContact"\n\txmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="createPage"\n        showFooter="true"\n\t\tbusy="{detailView>/busy}"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title\n                id="createContactTitle"\n\t\t\t\ttext="Create Contact"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:content><f:SimpleForm id="SimpleFormChange354wide"\n\t\t\teditable="true"\n\t\t\tlayout="ResponsiveGridLayout"\n\t\t\tlabelSpanXL="4"\n\t\t\tlabelSpanL="3"\n\t\t\tlabelSpanM="4"\n\t\t\tlabelSpanS="12"\n\t\t\tadjustLabelSpan="false"\n\t\t\temptySpanXL="0"\n\t\t\temptySpanL="4"\n\t\t\temptySpanM="0"\n\t\t\temptySpanS="0"\n\t\t\tcolumnsXL="2"\n\t\t\tcolumnsL="1"\n\t\t\tcolumnsM="1"\n\t\t\tsingleContainerFullSize="false"><f:content><Label text="Name" /><Input id="bookingName" value="{/contact/Name}" /><Label text="Firstname" /><Input id="bookingFirstname" value="{/contact/Firstname}" /><Label text="Startdate" /><Label text="Email" /><Input id="Email" value="{/contact/Email}" /></f:content></f:SimpleForm></semantic:content><semantic:footerCustomActions><Button text="Save" id="createContactButton" press=".onCreatePressed"/><Button text="Cancel" id="cancelContactButton" press="navToDetail" /></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>',
	"zsd031hoteldetail/view/Detail.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.Detail"\n    xmlns:m="sap.m"\n    xmlns="sap.uxap"\n    xmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="detailPage"\n\t\tbusy="{detailView>/busy}"\n        showFooter="true"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><m:Title\n                id="detailTitle"\n\t\t\t\ttext="{/hotel/Name}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent><m:ObjectAttribute title="Name" text="{/hotel/Name}"/><m:ObjectAttribute title="Adress" text="{/hotel/Country} - {/hotel/City} - {/hotel/Street}"/><m:Label text="Description:" /><m:Input id="hotelDescriptionInput" liveChange=".onInputChange" value="{/hotel/Description}"/></semantic:headerContent><semantic:content><m:VBox><m:items><m:Panel class="sapUiResponsiveMargin" width="auto" headerText="Bookings"><m:content><m:List\n                    id="bookingList"\n                    width="auto"\n                    class="sapFDynamicPageAlignContent"\n                    items="{/bookings}"\n                    busyIndicatorDelay="{listView>/delay}"\n                    noDataText="{listView>/noDataText}"\n                    mode="{= ${device>/system/phone} ? \'None\' : \'SingleSelectMaster\'}"\n                    growing="true"\n                    growingScrollToLoad="true"\n                    updateFinished=".onUpdateFinished"\n                    selectionChange=".onBookingChange"><m:headerToolbar><m:OverflowToolbar><m:ToolbarSpacer/><m:Button\n\t\t\t\t\t        text="Add"\n\t\t\t\t\t\t    ariaDescribedBy="acceptButtonDescription genericButtonDescription"\n\t\t\t\t\t\t\tid="addBookingButton"\n                            press=".addBookingPressed"\n\t\t\t\t\t\t\ttype="Transparent"/></m:OverflowToolbar></m:headerToolbar><m:items><m:ObjectListItem\n                    \ttype="Navigation"\n\t\t\t\t\t\tpress=".onBookingChange"\n                        number="{Nights}"\n                        numberUnit="Nights"\n\t\t\t\t\t\ttitle="{Firstname} {Name} - \n                            {path: \'Startdate\', type: \'sap.ui.model.type.Date\',formatOptions: { style: \'short\', strictParsing: true, relative: false }}" ><m:ObjectAttribute text="{Email}" /></m:ObjectListItem></m:items></m:List></m:content></m:Panel><m:Panel class="sapUiResponsiveMargin" width="auto" headerText="Contacts"><m:content><m:List\n\t\t\t\tid="contactList"\n\t\t\t\twidth="auto"\n\t\t\t\tclass="sapFDynamicPageAlignContent"\n\t\t\t\titems="{/contacts}"\n\t\t\t\tbusyIndicatorDelay="{listView>/delay}"\n\t\t\t\tnoDataText="{listView>/noDataText}"\n\t\t\t\tmode="{= ${device>/system/phone} ? \'None\' : \'SingleSelectMaster\'}"\n\t\t\t\tgrowing="true"\n\t\t\t\tgrowingScrollToLoad="true"\n\t\t\t\tupdateFinished=".onUpdateFinished"\n\t\t\t\tselectionChange=".onContactChange"><m:headerToolbar><m:OverflowToolbar><m:ToolbarSpacer/><m:Button\n\t\t\t\t\t        text="Add"\n\t\t\t\t\t\t    ariaDescribedBy="acceptButtonDescription genericButtonDescription"\n\t\t\t\t\t\t\tid="addContactButton"\n                            press=".addContactPressed"\n\t\t\t\t\t\t\ttype="Transparent"/></m:OverflowToolbar></m:headerToolbar><m:items><m:ObjectListItem\n\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\tpress=".onContactChange"\n\t\t\t\t\t\ttitle="{Firstname} {Name}"\n                        number="{\n                            parts:[{path:\'Price\'},{path:\'CurrencyCode\'}],\n                            type: \'sap.ui.model.type.Currency\',\n                            formatOptions: {showMeasure: true}\n                        }"><m:ObjectAttribute text="{Email}" /></m:ObjectListItem></m:items></m:List></m:content></m:Panel></m:items></m:VBox></semantic:content><semantic:footerCustomActions><m:Button text="Save" id="editDescriptionButton" enabled="false" press=".onUpdatePressed"/><m:Button text="Cancel" id="cancelEditButton" press=".onCancelPressed" /></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>\n',
	"zsd031hoteldetail/view/UpdateBooking.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.UpdateBooking"\n\txmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="createPage"\n\t\tbusy="{detailView>/busy}"\n        showFooter="true"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title\n                id="updateBookingTitle"\n\t\t\t\ttext="Update Booking"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent></semantic:headerContent><semantic:content><f:SimpleForm id="SimpleFormChange354wide"\n\t\t\teditable="true"\n\t\t\tlayout="ResponsiveGridLayout"\n\t\t\tlabelSpanXL="4"\n\t\t\tlabelSpanL="3"\n\t\t\tlabelSpanM="4"\n\t\t\tlabelSpanS="12"\n\t\t\tadjustLabelSpan="false"\n\t\t\temptySpanXL="0"\n\t\t\temptySpanL="4"\n\t\t\temptySpanM="0"\n\t\t\temptySpanS="0"\n\t\t\tcolumnsXL="2"\n\t\t\tcolumnsL="1"\n\t\t\tcolumnsM="1"\n\t\t\tsingleContainerFullSize="false"><f:content><Label text="Name" /><Input id="bookingName" value="{/toUpdateBooking/Name}" /><Label text="Firstname" /><Input id="bookingFirstname" value="{/toUpdateBooking/Firstname}" /><Label text="Startdate" /><DatePicker\n                    id="startDate"\n                    valueFormat="yyyy.MM.dd"\n                    placeholder="Enter Date"\n                    change="handleChange"\n                    value="{/toUpdateBooking/Startdate}"\n                    class="sapUiSmallMarginBottom"/><Label text="Nights" /><Input id="nights" type="Number" value="{/toUpdateBooking/Nights}" /><Label text="Email" /><Input id="Email" value="{/toUpdateBooking/Email}" /></f:content></f:SimpleForm></semantic:content><semantic:deleteAction><semantic:DeleteAction id="deleteBookingButton"\n                    press=".onDeletePressed" /></semantic:deleteAction><semantic:footerCustomActions><Button text="Save" id="editBookingButton" press=".onUpdatePressed"/><Button text="Cancel" id="cancelButton" press="navToDetail" /></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>\n\n',
	"zsd031hoteldetail/view/UpdateContact.view.xml":'<mvc:View\n    controllerName="zsd031hoteldetail.controller.UpdateContact"\n\txmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core"\n\txmlns:semantic="sap.f.semantic"\n\txmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage\n\t\tid="createPage"\n\t\tbusy="{detailView>/busy}"\n        showFooter="true"\n\t\tbusyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title\n                id="updateContactTitle"\n\t\t\t\ttext="Update Contact"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent></semantic:headerContent><semantic:content><f:SimpleForm id="SimpleFormChange354wide"\n\t\t\teditable="true"\n\t\t\tlayout="ResponsiveGridLayout"\n\t\t\tlabelSpanXL="4"\n\t\t\tlabelSpanL="3"\n\t\t\tlabelSpanM="4"\n\t\t\tlabelSpanS="12"\n\t\t\tadjustLabelSpan="false"\n\t\t\temptySpanXL="0"\n\t\t\temptySpanL="4"\n\t\t\temptySpanM="0"\n\t\t\temptySpanS="0"\n\t\t\tcolumnsXL="2"\n\t\t\tcolumnsL="1"\n\t\t\tcolumnsM="1"\n\t\t\tsingleContainerFullSize="false"><f:content><Label text="Name" /><Input id="bookingName" value="{/toUpdateContact/Name}" /><Label text="Firstname" /><Input id="bookingFirstname" value="{/toUpdateContact/Firstname}" /><Label text="Email" /><Input id="Email" value="{/toUpdateContact/Email}" /></f:content></f:SimpleForm></semantic:content><semantic:deleteAction><semantic:DeleteAction id="deleteBookingButton"\n                    press=".onDeletePressed" /></semantic:deleteAction><semantic:footerCustomActions><Button text="Save" id="editContactButton" press=".onUpdatePressed"/><Button text="Cancel" id="cancelButton" press="navToDetail" /></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>'
}});
