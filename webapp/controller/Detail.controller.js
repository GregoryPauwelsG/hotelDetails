sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/m/library"
],

    function (BaseController, JSONModel, mobileLibrary) {
        "use strict";
        const hotelId = 0;
        let descriptionBeforeEdit;

        return BaseController.extend("zsd031hoteldetail.controller.Detail", {
            
            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                
                oRouter.getRoute("Detail").attachMatched(function(oEvent) {
                    this.hotelId = oEvent.getParameter("arguments").hotelId;
                    this._selectItemWithId(oEvent.getParameter("arguments").hotelId);
                }, this);   

            },
            
            _selectItemWithId : function(id) {
                var oModel = this.getOwnerComponent().getModel();
                console.log(oModel);
                var oView = this.getView();
                oModel.read("/hotelSet("+id+")", {
                    urlParameters: {
                        "$expand": "hotelContact,hotelBooking"
                    },
                    success: function(data, response) {
                        const jsonModel = new JSONModel();
                        jsonModel.setProperty("/hotel", data);
                        oView.setModel(jsonModel);
                        descriptionBeforeEdit = data.Description;

                        let bookings = data.hotelBooking.results;
                        jsonModel.setProperty("/bookings", bookings);

                        let contacts = data.hotelContact.results;
                        jsonModel.setProperty("/contacts", contacts);
                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            }, 

            addBookingPressed: function (oEvent) {
                this.getRouter().navTo("CreateBooking", {
                    hotelId : this.hotelId
                });  
            },    

            addContactPressed: function(oEvent){
                this.getRouter().navTo("CreateContact", {
                    hotelId : this.hotelId
                }); 
            },
            /**
             * Lock UI when changing data in the input controls
             * @param {sap.ui.base.Event} oEvt - Event data
             */
            onInputChange : function (oEvt) {
                if(this.getView().byId("editDescriptionButton").getEnabled() == false){
                    this.getView().byId("editDescriptionButton").setEnabled(true);
                }
            },

            onUpdatePressed : function(){
                let toUpdateHotel = this.getView().getModel().getProperty("/hotel");

                let hotel = {
                    Id : toUpdateHotel.Id,
                    Name: toUpdateHotel.Name,
                    Street : toUpdateHotel.Street,
                    City : toUpdateHotel.City,
                    Country : toUpdateHotel.Country,
                    Description : toUpdateHotel.Description
                };
                descriptionBeforeEdit = toUpdateHotel.Description;

                this.getOwnerComponent().getModel().update("/hotelSet("+hotel.Id+")", hotel, {
                    merge: false, /* if set to true: PATCH/MERGE */
                    success: function() { console.log("succes") },
                    error: function(oError) { console.log(oError) }
                  });
                  this.getView().byId("editDescriptionButton").setEnabled(false);
            },

            onCancelPressed : function(){
                let hotel = this.getView().getModel().getProperty("/hotel");
                console.log(hotel.Description);
               
                this.getView().byId("hotelDescriptionInput").setValue(descriptionBeforeEdit);
            },

 
            onBookingChange: function (oEvent) {
                var oList = oEvent.getSource(),
                    bSelected = oEvent.getParameter("selected");

                // skip navigation when deselecting an item in multi selection mode
                if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                    // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                    this._showBookingDetail(oEvent.getParameter("listItem") || oEvent.getSource());

                }
            },

            onContactChange: function (oEvent) {
                var oList = oEvent.getSource(),
                    bSelected = oEvent.getParameter("selected");

                // skip navigation when deselecting an item in multi selection mode
                if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                    // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                    this._showContactDetail(oEvent.getParameter("listItem") || oEvent.getSource());

                }
            },

            _showContactDetail: function (oItem) {
                this.getRouter().navTo("UpdateContact", {
                    contactId : oItem.getBindingContext().getProperty("Id")
                });    
            },
            _showBookingDetail: function (oItem) {
                this.getRouter().navTo("UpdateBooking", {
                    bookingId : oItem.getBindingContext().getProperty("Id")
                });              
            },
        });
    });
