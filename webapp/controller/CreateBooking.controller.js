sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
	"sap/m/library",
    'sap/m/MessageBox'
],

    function (BaseController, JSONModel, DateFormat, mobileLibrary, MessageBox) {
        "use strict";
        var hotelId;

        return BaseController.extend("zsd031hoteldetail.controller.CreateBooking", {

            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("CreateBooking").attachMatched(function(oEvent) {
                    this._selectItemWithId(oEvent.getParameter("arguments").hotelId);
                }, this);

                var date = new Date();
                console.log(date);

            },

            _selectItemWithId : function(id) {
                hotelId = parseInt(id);
                const jsonModel = new JSONModel();

                let booking = {
                    HotelId : hotelId,
                    Id: 0,
                    Name: "",
                    Firstname: "",
                    Startdate: "2022.01.01",
                    Nights: 0,
                    Email: "",
            };

                jsonModel.setProperty("/booking", booking);
                this.getView().setModel(jsonModel);
            },

            onCreatePressed: function(){
                let newBooking = this.getView().getModel().getProperty("/booking");
                let validDate = true;

                newBooking.Nights = parseInt(newBooking.Nights);

                let startDateBooking = newBooking.Startdate;

                const dt =  DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });

                try {
                    let dateArray = startDateBooking.split(".");
                    let convertedDate = dateArray[0]+"-"+dateArray[1]+"-"+dateArray[2];
                    newBooking.Startdate = dt.parse(convertedDate+"T00:00:00");
                    
                } catch (error) {
                    validDate = false;
                }

                if(!validDate || newBooking.Startdate == null){
                    MessageBox.show(
                        "Use the date picker to choose a valid date.", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "Use the date picker",
                            actions: [MessageBox.Action.OK],
                            onClose: function(oAction) { / * do something * / }
                        }
                    );
                }
                else if(newBooking.Startdate <= new Date() ){
                    MessageBox.show(
                        "The date that you'll arrive, can only be in the future.", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "Date can only be in the future.",
                            actions: [MessageBox.Action.OK],
                            onClose: function(oAction) { / * do something * / }
                        }
                    );
                }
                else if(isNaN(newBooking.Nights) || newBooking.Nights === 0){
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
                    this.getOwnerComponent().getModel().create("/bookingSet",newBooking);
                    this.navToDetail();
                }

                
             },
            
             navToDetail : function(){
                this.getRouter().navTo("Detail", {
                    hotelId : hotelId
                }); 
            }

        });
    });
