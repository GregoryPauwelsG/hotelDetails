sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
	"sap/m/library"
],

    function (BaseController, JSONModel, DateFormat, mobileLibrary) {
        "use strict";
        // shortcut for sap.m.URLHelper
        var hotelId;

        return BaseController.extend("zsd031hoteldetail.controller.CreateContact", {

            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("CreateContact").attachMatched(function(oEvent) {
                    this._selectItemWithId(oEvent.getParameter("arguments").hotelId);
                }, this);

            },

            _selectItemWithId : function(id) {
                hotelId = parseInt(id);
                const jsonModel = new JSONModel();
                let contact = {
                    HotelId : hotelId,
                    Id: 0,
                    Name: "",
                    Firstname: "",
                    Email: "",
            };

                jsonModel.setProperty("/contact", contact);
                this.getView().setModel(jsonModel);
            },

            onCreatePressed: function(){
                let newContact = this.getView().getModel().getProperty("/contact");
                this.getOwnerComponent().getModel().create("/contactSet",newContact);
                this.navToDetail();
            },
           
            navToDetail : function(){
               this.getRouter().navTo("Detail", {
                   hotelId : hotelId
               }); 
           }


        });
    });
