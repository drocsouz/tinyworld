var oFirstDialog;
var oEditDialog;
var oMessageToast;

function openFirstDialog() {

	if (oFirstDialog) {

		oFirstDialog.open();

	} else {
		
		oMessageToast = new sap.ui.commons.MessageToast();
		oFirstDialog = new sap.ui.commons.Dialog({

			width: "400px", // sap.ui.core.CSSSize
			height: "550px", // sap.ui.core.CSSSize
			title: "Country Details", // string
			applyContentPadding: true, // boolean
			modal: true, // boolean

			content: [new sap.ui.commons.form.SimpleForm({

					content: [

						new sap.ui.core.Title({
							text: "Country Name"
						}),

						new sap.ui.commons.Label({
							text: "name"
						}),
						new sap.ui.commons.TextField({
							value: "",
							id: "name"
						}),

						new sap.ui.commons.Label({
							text: "partof"
						}),
						new sap.ui.commons.TextField({
							value: "",
							id: "partof"
						})

					]

				})] // sap.ui.core.Control

		});

		oFirstDialog.addButton(new sap.ui.commons.Button({

			text: "OK",

			press: function () {
				
				var name = sap.ui.getCore().byId("name").getValue();
				var partof = sap.ui.getCore().byId("partof").getValue();
				var payload = {};
				payload.name = name;
				payload.partof = partof;
				//var insertdata = JSON.stringify(payload);
				
				var request = new XMLHttpRequest();
				var dados = "?name=" + name + "&continent=" + partof;
				var requisicao = "country/country.xsjs" + dados;
				
				//country/country.xsjs?name=Taiwan&continent=Asia
				request.open("POST", requisicao, true);
				request.setRequestHeader("Content-type", "application/json");
				request.addEventListener("readystatechange", function() {
    				if (request.readyState === 4) {
        			//normalmente uso apenas o status 200 para verificar se é sucesso.
        				if (request.status >= 200 && request.status < 400) { 
   							oFirstDialog.close();
    						sap.ui.getCore().byId("tinytab").getModel().refresh(true);
    						var n = request.responseText.includes("ERRO");
    						if(n){
    							//oMessageToast.show(request.responseText);
    							alert(request.responseText);
    						}
        				} 
					 }   
				});		

			request.send();

			}

		}));

		oFirstDialog.open();

	}

}

function onDelete(oEvent) {
	var objID = oEvent.getSource().getBindingContext().getObject();
	//alert("The country " + objID.name + " was removed" + "ID: " + objID.ID);
	var request = new XMLHttpRequest();
	var requisicao = "country/deleteCountry.xsjs" + "?name=" + objID.name;
	request.open("POST", requisicao, true);
	request.setRequestHeader("Content-type", "application/json");
	request.addEventListener("readystatechange", function() {
	    if (request.readyState === 4) {
	     //normalmente uso apenas o status 200 para verificar se é sucesso.
	    	if (request.status >= 200 && request.status < 400) { 
	   			
	    		sap.ui.getCore().byId("tinytab").getModel().refresh(true);
	    		var n = request.responseText.includes("ERRO");
	    		if(n){
	    			//oMessageToast.show(request.responseText);
	    			alert(request.responseText);
	    		}
	        } 
		}   
	});		

			request.send();
}

function openEditDialog(oEvent) {
	var name = oEvent.getSource().getBindingContext().getObject().name;
	if (oEditDialog) {

		oEditDialog.open();

	} else {
		
		oEditDialog = new sap.ui.commons.Dialog({

			width: "400px", // sap.ui.core.CSSSize
			height: "550px", // sap.ui.core.CSSSize
			title: "Country Details", // string
			applyContentPadding: true, // boolean
			modal: true, // boolean

			content: [new sap.ui.commons.form.SimpleForm({

					content: [

						new sap.ui.core.Title({
							text: "Edit Country Name"
						}),

						new sap.ui.commons.Label({
							text: "Name"
						}),
						new sap.ui.commons.TextField({
							value: name,
							id: "name",
							editable: false
						}),

						new sap.ui.commons.Label({
							text: "New Name"
						}),
						new sap.ui.commons.TextField({
							value: "",
							id: "name_new"
						})

					]

				})] // sap.ui.core.Control

		});

		oEditDialog.addButton(new sap.ui.commons.Button({

			text: "OK",

			press: function () {
				
				var name   = sap.ui.getCore().byId("name").getValue();
				var name_new = sap.ui.getCore().byId("name_new").getValue();
				
				var request = new XMLHttpRequest();
				var dados = "?name=" + name + "&name_new=" + name_new;
				var requisicao = "country/updateCountry.xsjs" + dados;
				
				//country/country.xsjs?name=Taiwan&continent=Asia
				request.open("POST", requisicao, true);
				request.setRequestHeader("Content-type", "application/json");
				request.addEventListener("readystatechange", function() {
    				if (request.readyState === 4) {
        			//normalmente uso apenas o status 200 para verificar se é sucesso.
        				if (request.status >= 200 && request.status < 400) { 
   							oEditDialog.close();
    						sap.ui.getCore().byId("tinytab").getModel().refresh(true);
    						var n = request.responseText.includes("ERRO");
    						if(n){
    							//oMessageToast.show(request.responseText);
    							alert(request.responseText);
    						}
        				} 
					 }   
				});		

			request.send();

			}

		}));

		oEditDialog.open();

	}

}
