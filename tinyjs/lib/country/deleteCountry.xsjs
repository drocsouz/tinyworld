function deleteCountry(country){
	
		var conn = $.hdb.getConnection();
		
		var output = JSON.stringify(country);
		var fnCreateCountry = conn.loadProcedure("tinyworld.tinydb::deleteCountry");

		var result = fnCreateCountry({
			IM_COUNTRY: country.name
		});

		conn.commit();

		conn.close();

	if (result && result.EX_ERROR != null) {
		return result.EX_ERROR;
	} else {
		return output;
	}

}

var country = { 
	name: $.request.parameters.get("name")
};

// validate the inputs here!
var output = deleteCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output);
