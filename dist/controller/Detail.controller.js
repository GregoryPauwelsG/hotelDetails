sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/library"],function(t,e,o){"use strict";const n=0;let i;return t.extend("zsd031hoteldetail.controller.Detail",{onInit:function(){var t=this.getOwnerComponent().getRouter();t.getRoute("Detail").attachMatched(function(t){this.hotelId=t.getParameter("arguments").hotelId;this._selectItemWithId(t.getParameter("arguments").hotelId)},this)},_selectItemWithId:function(t){var o=this.getOwnerComponent().getModel();console.log(o);var n=this.getView();o.read("/hotelSet("+t+")",{urlParameters:{$expand:"hotelContact,hotelBooking"},success:function(t,o){const s=new e;s.setProperty("/hotel",t);n.setModel(s);i=t.Description;let r=t.hotelBooking.results;s.setProperty("/bookings",r);let l=t.hotelContact.results;s.setProperty("/contacts",l)},error:function(t){console.log(t)}})},addBookingPressed:function(t){this.getRouter().navTo("CreateBooking",{hotelId:this.hotelId})},addContactPressed:function(t){this.getRouter().navTo("CreateContact",{hotelId:this.hotelId})},onInputChange:function(t){if(this.getView().byId("editDescriptionButton").getEnabled()==false){this.getView().byId("editDescriptionButton").setEnabled(true)}},onUpdatePressed:function(){let t=this.getView().getModel().getProperty("/hotel");let e={Id:t.Id,Name:t.Name,Street:t.Street,City:t.City,Country:t.Country,Description:t.Description};i=t.Description;this.getOwnerComponent().getModel().update("/hotelSet("+e.Id+")",e,{merge:false,success:function(){console.log("succes")},error:function(t){console.log(t)}});this.getView().byId("editDescriptionButton").setEnabled(false)},onCancelPressed:function(){let t=this.getView().getModel().getProperty("/hotel");console.log(t.Description);this.getView().byId("hotelDescriptionInput").setValue(i)},onBookingChange:function(t){var e=t.getSource(),o=t.getParameter("selected");if(!(e.getMode()==="MultiSelect"&&!o)){this._showBookingDetail(t.getParameter("listItem")||t.getSource())}},onContactChange:function(t){var e=t.getSource(),o=t.getParameter("selected");if(!(e.getMode()==="MultiSelect"&&!o)){this._showContactDetail(t.getParameter("listItem")||t.getSource())}},_showContactDetail:function(t){this.getRouter().navTo("UpdateContact",{contactId:t.getBindingContext().getProperty("Id")})},_showBookingDetail:function(t){this.getRouter().navTo("UpdateBooking",{bookingId:t.getBindingContext().getProperty("Id")})}})});