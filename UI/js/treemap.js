var treemap_data = [];

$(document).ready(function() {
	
	// Reading parameter in ***********
	var area = "";
	if (location.search) {
		var parts = location.search.substring(1);
		area = parts.split("=")[1];
	}
	var filename = "data/flare_" + area + ".json";
	//***********************************

	$.getJSON(filename, function(data) {
		var visualization = d3plus.viz()
    	.container("#treemap")
   		.data(data)
    	.type("tree_map")
    	.id("name")
    	.size("size")
    	.font({ "family": "Times" })
    	.color(function(d){
    		return d.growth > 0 ? "#008800" : "#B8DBFF";
    	})
    	.draw();
	});


	$("#treemap").click(function(event) {
		alert(event.target.__data__.name);
	});

});
