function updateCountry(country){
	
		var conn = $.hdb.getConnection();
		
		var output = JSON.stringify(country);
		var fnCreateCountry = conn.loadProcedure("tinyworld.tinydb::updateCountry");

		var result = fnCreateCountry({
			IM_COUNTRY: country.name,
			IM_COUNTRY_NEW: country.name_new
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
	name: $.request.parameters.get("name"),
	name_new: $.request.parameters.get("name_new")
};

// validate the inputs here!
var output = updateCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output);
