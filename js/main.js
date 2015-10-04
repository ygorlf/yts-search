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
	var url = "https://yts.to/api/v2/list_movies.json" + "?query_term=" + search;
	
	var xhr = createCORSRequest("GET", url);
	if(!xhr) {
		console.log("CORS not Suported");
		return;
	}
	xhr.onload = function() {
		var ytsInfo = xhr.responseText;
		ytsData = JSON.parse(ytsInfo);
		injectData(ytsData);
	};

	xhr.onerror = function() {
		alert("Woops, there was an error making the request...");
	};
	xhr.send();
};

// Creating HTML Structure...
var injectData = function(info) {
	// Grab the template script...
	var templateScript = $("#movies-template");

	// Compile the template...
	var templateCompiled = Handlebars.compile(templateScript);

	// Pass our data to the template...
	var templateData = templateCompiled(info.data);

	// Add the compiled html to the page...
	$("#movies").html(templateData);

};





