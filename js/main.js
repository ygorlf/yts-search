// Grab the template script...
var templateScript = $("#movies-template").html();

// Compile the template...
var templateCompiled = Handlebars.compile(templateScript);

$("#search").click(function(event) {
  	event.preventDefault();
  	var search = $("#request").val();
	console.log(search);
	makeCORSRequest(search);
});

// CORS Request
var createCORSRequest = function(method, url) {
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if(typeof XDomainRequest != undefined) {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
};

var makeCORSRequest = function(search) {
	var apiKey = "674e056a0305570de7e7dea12691bb59";
	var url = "http://api.themoviedb.org/3/search/movie?" + "api_key=" + apiKey + "&query=" + search;
	
	var xhr = createCORSRequest("GET", url);
	if(!xhr) {
		console.log("CORS not Suported");
		return;
	}
	xhr.onload = function() {
		var ytsInfo = xhr.responseText;
		ytsData = JSON.parse(ytsInfo);
		if(ytsData.total_results === 0) {
			$("#movies").html("<h1>No movies founded...</h1>");
			return;
		} else {
			// Pass our data to the template...
			$("#movies").html(templateCompiled(ytsData));
			console.log(ytsData);
		}
	};

	xhr.onerror = function() {
		alert("Woops, there was an error making the request...");
	};
	xhr.send();
};