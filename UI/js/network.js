var positions_fake = [
    "\"x\": 60, \"y\": 20",
    "\"x\": 40, \"y\": 0",
    "\"x\": 20, \"y\": 20",
    "\"x\": 40, \"y\": 40",
    "\"x\": 54, \"y\": 6",
    "\"x\": 26, \"y\": 6",
    "\"x\": 26, \"y\": 34",
    "\"x\": 54, \"y\": 34"
  ];

var fake_data;
var browseTerm = ""; 
var nodeStr = "[";
var positionStr = "[";
var connectionStr = "[";
var nodes;
var positions;
var connections;
var filename = "data/fake_data.json";

function readData(input) {
  for (var i = 0; i < fake_data.length; i ++) {
  	if(fake_data[i].concept === input) {
  		nodeStr += "{\"name\":\"" + fake_data[i].concept + "\", \"size\":" + 500 + "},";
  		positionStr += "{\"name\":\"" + fake_data[i].concept + "\", \"x\": 40, \"y\": 20},";
  		
  		var j = 0;
  		// The way of string concatenating is stupid... I am not sure whether we have StringBuilder in javascript
  		for (j = 0; j < fake_data[i].connections.length - 1; j ++) {
  			nodeStr += "{\"name\":\"" + fake_data[i].connections[j].target + "\", \"size\":" + fake_data[i].connections[j].size + "},";
  			positionStr += "{\"name\":\"" + fake_data[i].connections[j].target + "\", " + positions_fake[j] + "},";
  			connectionStr += "{\"source\":\"" + fake_data[i].concept + "\", \"target\":\"" + fake_data[i].connections[j].target + "\"},";
  		}
  		
  		nodeStr += "{\"name\":\"" + fake_data[i].connections[j].target + "\", \"size\":" + fake_data[i].connections[j].size + "}]";
  		positionStr += "{\"name\":\"" + fake_data[i].connections[j].target + "\", " + positions_fake[j] + "}]";
  		connectionStr += "{\"source\":\"" + fake_data[i].concept + "\", \"target\":\"" + fake_data[i].connections[j].target + "\"}]";
  		
  	}
  	
  }
}


$(document).ready(function() {
	$.getJSON(filename, function(data) {
		fake_data = data;
		if (location.search) {
		var parts = location.search.substring(1);
		browseTerm = parts.split("=")[1];
		appendHistory(browseTerm);
		render_network(browseTerm);
	}
	});
	$("#network").click(function(event) {
		appendHistory(event.target.__data__.name);
		render_network(event.target.__data__.name);
		//window.location = "network.html?term=" + event.target.__data__.name;
	});
	$("#history").click(function(event) {
		appendHistory(event.target.innerText);
		render_network(event.target.innerText);
	});
});

function render_network(browseTerm){
	readData(browseTerm);

	nodes = JSON.parse(nodeStr);
	positions = JSON.parse(positionStr);
	connections = JSON.parse(connectionStr);
	
	nodeStr = "[";
	positionStr = "[";
	connectionStr = "[";
	
	// instantiate d3plus
  	var visualization = d3plus.viz()
    .container("#network")  // container DIV to hold the visualization
    .type("network")    // visualization type
    .data(nodes)  // sample dataset to attach to nodes
    .nodes(positions)   // x and y position of nodes
    .edges(connections) // list of node connections
    .size("size")       // key to size the nodes
    .id("name")         // key for which our data is unique on
    .color(function(d){
      return d.growth > 0 ? "#008800" : "#B8DBFF";
    })
    .draw();             // finally, draw the visualization!
	
}

function appendHistory(term) {
    var ul = document.getElementById("history");
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.textContent = term;
	//a.setAttribute('href', path+"newTerm");
	li.appendChild(a);
	ul.appendChild(li);
	ul.appendChild(document.createTextNode(' '));
}
  
