sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/m/library",
    'sap/m/MessageBox'
],

    function (BaseController, JSONModel, mobileLibrary, MessageBox) {
        "use strict";
        var hotelId;
        var currentDate;

        return BaseController.extend("zsd031hoteldetail.controller.UpdateBooking", {

            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("UpdateBooking").attachMatched(function(oEvent) {
                    this._selectItemWithId(oEvent.getParameter("arguments").bookingId);
                }, this);
            },

            _selectItemWithId : function(id) {
                var oModel = this.getOwnerComponent().getModel();
                var oView = this.getView();
                
                oModel.read("/bookingSet("+id+")", {
                    success: function(data, response) {
                        const jsonModel = new JSONModel();

                        jsonModel.setProperty("/toUpdateBooking", data);
                        hotelId = data.HotelId;
                        currentDate = data.Startdate;
                        oView.setModel(jsonModel);
                        console.log(data.Startdate);

                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            },

            onUpdatePressed : function() {
                const dt =  sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });

                let validDate = true;
                let updatedBooking = this.getView().getModel().getProperty("/toUpdateBooking");
                let startDateBooking = ""+updatedBooking.Startdate;

                console.log(updatedBooking.Startdate);
                if(updatedBooking.Startdate != currentDate){
                    try {
                        let dateArray = startDateBooking.split(".");
                        let convertedDate = dateArray[0]+"-"+dateArray[1]+"-"+dateArray[2];
                        updatedBooking.Startdate = dt.parse(convertedDate+"T05:00:00");
                        console.log( updatedBooking.Startdate);
                    } catch (error) {
                        validDate = false;
                    }
                }
 
                updatedBooking.Nights = parseInt(updatedBooking.Nights);

                if(!validDate || updatedBooking.Startdate == null){
                    console.log("no valid date");
                    MessageBox.show(
                        "Use the date picker to choose a valid date.", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "Use the date picker",
                            actions: [MessageBox.Action.OK],
                            onClose: function(oAction) { / * do something * / }
                        }
                    );
                }else if(updatedBooking.Startdate <= new Date() ){
                    MessageBox.show(
                        "The date that you'll arrive, can only be in the future.", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "Date can only be in the future.",
                            actions: [MessageBox.Action.OK],
                            onClose: function(oAction) { / * do something * / }
                        }
                    );
                }else if(isNaN(updatedBooking.Nights || updatedBooking.Nights == 0)){
                    MessageBox.show(
                        "Fill in a number other than 0 in the field Nights.", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "Fill in a number",
                            actions: [MessageBox.Action.OK],
                            onClose: function(oAction) { / * do something * / }
                        }
                    );
                }
                else{
                    this.getOwnerComponent().getModel().update("/bookingSet("+updatedBooking.Id+")", updatedBooking, {
                        merge: true, /* if set to true: PATCH/MERGE */
                        success: function() { console.log("succes") },
                        error: function(oError) { console.log(oError) }
                      });
                      console.log(updatedBooking.HotelId);
                    this.navToDetail();
                }
                
            },

            onDeletePressed : function(){
                let bookingToDelete = this.getView().getModel().getProperty("/toUpdateBooking");

                this.getOwnerComponent().getModel().remove("/bookingSet("+bookingToDelete.Id+")", {
                    success: function() { console.log("Booking is deleted.") },
                    error: function(oError) { console.log(oError) }
                  }); 
                  this.navToDetail();
            },

            navToDetail : function(){
                this.getRouter().navTo("Detail", {
                    hotelId : hotelId
                }); 
                //window.location.reload();
            }
        });
    });
