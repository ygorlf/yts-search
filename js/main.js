var moviesList = document.getElementById("movies");

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
		moviesList.innerHTML = "";
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
	for(var i = 0; i < info.data.movies.length; i++) {
		var movieHolder = document.createElement("div");
		movieHolder.classList.add("movie");
		
		var movieImage = document.createElement("img");
		movieImage.setAttribute("src", info.data.movies[i].medium_cover_image);
		
		var movieTitle = document.createElement("h2");
		movieTitle.innerHTML = info.data.movies[i].title_long;
    
    	var movieInfo = document.createElement("div");
    	movieInfo.classList.add("movie-info");
		
		var torrentUrl = document.createElement("a");
    	torrentUrl.classList.add("btn");
		torrentUrl.innerHTML = "Download";
		torrentUrl.setAttribute("href", info.data.movies[i].torrents[0].url);
    
<<<<<<< HEAD
    var movieLink = document.createElement("a");
    movieLink.classList.add("fa");
    movieLink.classList.add("fa-link");
    movieLink.setAttribute("href", info.data.movies[i].url);
    movieLink.setAttribute("target", "_blank");
=======
    	var movieLink = document.createElement("a");
    	movieLink.classList.add("fa");
    	movieLink.classList.add("fa-link");
    	movieLink.setAttribute("href", info.data.movies[i].url);
    	movieLink.setAttribute("target", "_blank");
>>>>>>> Changing some classes and align movies in the center
    
    	var movieRating = document.createElement("a");
    	movieRating.classList.add("fa");
    	movieRating.classList.add("fa-heart");
    	movieRating.innerHTML = info.data.movies[i].rating;
		
		movieHolder.appendChild(movieImage);
		movieHolder.appendChild(movieTitle);
    	movieInfo.appendChild(torrentUrl);
    	movieInfo.appendChild(movieLink);
    	movieInfo.appendChild(movieRating);
		movieHolder.appendChild(movieInfo);
		
		moviesList.appendChild(movieHolder);
	}
};





