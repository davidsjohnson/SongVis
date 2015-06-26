var URL_ECHONEST_API = "http://developer.echonest.com/api/v4/";
var API_KEY= 'RRAUM8UKXJEVAKNM1';

angular.module('songService', [])

.factory('Song', function($http) {

	// create a new object
	var songFactory = {};

	songFactory.search = function(queryStr, type) {
		// Generates a list of songs using the Echonest Playlist API

		queryStr = queryStr.replace(" ", "+");
		var apiStr = URL_ECHONEST_API + 'playlist/static?api_key=' + API_KEY

		// genre
		if (type === "genre")
			apiStr = apiStr + "&genre=" + queryStr + "&format=json&results=50&type=genre-radio&bucket=id:spotify&bucket=tracks";
		else if (type === "artist")
			apiStr = apiStr + "&artist=" + queryStr + "&format=json&results=50&type=artist-radio&bucket=id:spotify&bucket=tracks";

		return $http.get(apiStr);
	};

	songFactory.getTrackSummary = function(id) {

		var apiStr = URL_ECHONEST_API + "track/profile?api_key=" + API_KEY + "&format=json&id=" + id + "&bucket=audio_summary"
		return $http.get(apiStr);
	};

	songFactory.getTrackAnalysis = function(url){
		return $http.get(url);
	}

	songFactory.getRelated = function(id){	
	};
	
	return songFactory;

});