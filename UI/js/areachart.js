var numArray = [];
var chartArray = [];
var area = 0;

function readfile() {
	// Read the file
	$.get("data/powerlaw_out.csv", function(data) {
		var allTextLines = data.split(/\r\n|\r|\n/g);
		for (var i = 1; i < allTextLines.length; i++) {
			var array = allTextLines[i].split(',');
			numArray.push(array[0]);
			chartArray.push(parseFloat(array[1]));
		}
		renderChart();
	});
}

function renderChart() {
	// Create a new canvas
	var canvas = document.createElement("canvas");
	canvas.width = $("#chart").width();
	canvas.height = $("#chart").height();
	$("#areaA").css("height", canvas.height);
	$("#areaB").css("height", canvas.height);
	$("#areaC").css("height", canvas.height);
	$("#areaD").css("height", canvas.height);

	// Data
	var data = {
		labels : numArray,
		datasets : [{
			fillColor : "rgba(55,142,211,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : chartArray,
			title : "Term Distribution"
		}]
	};

	// Render the contents
	var linechart = new Chart(canvas.getContext("2d")).Line(data);
	$("#chart").append(canvas);

}


$(document).ready(function() {
	// Adjust width and height
	$("#container").css("height", $(window).width() * 0.35);
	$("#chart").css("width", $("#container").width());
	$("#chart").css("height", $("#container").height());

	readfile(); // Read the file and render the chart

	// Mouse over areas
	$("#areaA").mouseover(function(event) {
		$("#areaA p").css("color", "#000099");
		$("#areaA").css("background-color", "white");
		$("#areaA").css("opacity", "0.5");
	}).mouseout(function(event) {
		$("#areaA p").css("color", "black");
		$("#areaA").css("background-color", "transparent");
		$("#areaA").css("opacity", "1");
	}).click(function(event) {
		window.location = "treemap.html?area=1";
	});

	$("#areaB").mouseover(function(event) {
		$("#areaB p").css("color", "#000099");
		$("#areaB").css("background-color", "white");
		$("#areaB").css("opacity", "0.5");
	}).mouseout(function(event) {
		$("#areaB p").css("color", "black");
		$("#areaB").css("background-color", "transparent");
		$("#areaB").css("opacity", "1");
	}).click(function(event) {
		window.location = "treemap.html?area=2";
	});

	$("#areaC").mouseover(function(event) {
		$("#areaC p").css("color", "#000099");
		$("#areaC").css("background-color", "white");
		$("#areaC").css("opacity", "0.5");
	}).mouseout(function(event) {
		$("#areaC p").css("color", "black");
		$("#areaC").css("background-color", "transparent");
		$("#areaC").css("opacity", "1");
	}).click(function(event) {
		window.location = "treemap.html?area=3";
	});

	$("#areaD").mouseover(function(event) {
		$("#areaD p").css("color", "#000099");
		$("#areaD").css("background-color", "white");
		$("#areaD").css("opacity", "0.5");
	}).mouseout(function(event) {
		$("#areaD p").css("color", "black");
		$("#areaD").css("background-color", "transparent");
		$("#areaD").css("opacity", "1");
	}).click(function(event) {
		window.location = "treemap.html?area=4";
	});
});

