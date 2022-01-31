sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/m/library",
    'sap/m/MessageBox'
],

    function (BaseController, JSONModel, mobileLibrary, MessageBox) {
        "use strict";
        var hotelId;

        return BaseController.extend("zsd031hoteldetail.controller.UpdateContact", {

            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("UpdateContact").attachMatched(function(oEvent) {
                    this._selectItemWithId(oEvent.getParameter("arguments").contactId);
                }, this);
            },

            _selectItemWithId : function(id) {
                var oModel = this.getOwnerComponent().getModel();
                var oView = this.getView();
                
                oModel.read("/contactSet("+id+")", {
                    success: function(data, response) {
                        const jsonModel = new JSONModel();
                        
                        jsonModel.setProperty("/toUpdateContact", data);
                        hotelId = data.HotelId;
                        oView.setModel(jsonModel);

                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            },

            onUpdatePressed : function() {
                let updatedContact = this.getView().getModel().getProperty("/toUpdateContact");

                this.getOwnerComponent().getModel().update("/contactSet("+updatedContact.Id+")", updatedContact, {
                    merge: true, /* if set to true: PATCH/MERGE */
                    success: function() { console.log("succes") },
                    error: function(oError) { console.log(oError) 
                        MessageBox.show(
                            "The selected contact isn't updated.", {
                                icon: MessageBox.Icon.INFORMATION,
                                title: "Use the date picker",
                                actions: [MessageBox.Action.OK],
                                onClose: function(oAction) { / * do something * / }
                            }
                        );
                    }
                  });
                  
                this.navToDetail();
            },

            onDeletePressed : function(){
                let contactToDelete = this.getView().getModel().getProperty("/toUpdateContact");

                this.getOwnerComponent().getModel().remove("/contactSet("+contactToDelete.Id+")", {
                    success: function() { console.log("Contact is deleted.") },
                    error: function(oError) { console.log(oError)
                        MessageBox.show(
                            "The selected contact isn't deleted.", {
                                icon: MessageBox.Icon.INFORMATION,
                                title: "Use the date picker",
                                actions: [MessageBox.Action.OK],
                                onClose: function(oAction) { / * do something * / }
                            }
                        ); 
                    }
                  }); 
                  this.navToDetail();
            },

            navToDetail : function(){
                this.getRouter().navTo("Detail", {
                    hotelId : hotelId
                }); 
            }
        });
    });