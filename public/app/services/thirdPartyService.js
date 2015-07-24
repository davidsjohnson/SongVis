var URL_ECHONEST_API = "http://developer.echonest.com/api/v4/";
var API_KEY= 'RRAUM8UKXJEVAKNM1';

var URL_SPOTIFY_API = "https://api.spotify.com/v1/"

var URL_SOUNDCLOUD_API = "http://api.soundcloud.com/"
var SC_API_KEY = "eb9e90c60d35fed9afe8fd7836ac7878"

angular.module('thirdPartyService', [])

.factory('ThirdParty', function($http) {

	// create a new object
	var thirdPartyFactory = {};

	thirdPartyFactory.searchSpotify = function(queryStr, type) {
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

	thirdPartyFactory.searchSoundCloud = function(queryStr, type){

		queryStr = queryStr.replace(" ", "+");
		var apiStr = URL_SOUNDCLOUD_API + "tracks?client_id=" + SC_API_KEY;
		var query_options = "&limit=50&duration[from]=60000&duration[to]=420000";  // limiting tracks to durations from 1 to 7 minutes

		if (type === "genre")
			apiStr = apiStr + "&genres=" + queryStr + query_options;
		else if (type === "keyword")
			apiStr = apiStr + "&q=" + queryStr + query_options;

		return $http.get(apiStr);

	}

	thirdPartyFactory.getSoundCloudTrack = function(id){
		var apiStr = URL_SOUNDCLOUD_API + "tracks/"+ id + "?client_id=" + SC_API_KEY;
		return $http.get(apiStr);
	}

	thirdPartyFactory.getTrackSummaryById = function(id) {

		var apiStr = URL_ECHONEST_API + "track/profile?api_key=" + API_KEY + "&format=json&id=" + id + "&bucket=audio_summary"
		return $http.get(apiStr);
	};

	thirdPartyFactory.analyzeTrackByUrl = function(data) {

		var apiStr = URL_ECHONEST_API + "track/upload"
		data.api_key = API_KEY; // add API key to post data
		data.url = data.url + "?client_id=" + SC_API_KEY;

		return $http({
    		url: apiStr,
   			method: 'POST',
    		data: "url=" + data.url + "&api_key=" + data.api_key,     // HACK for dealing with Echonest parameter requirements and deserialization of data
    		headers: {
        		"Content-Type": "application/x-www-form-urlencoded"
    		}
		});
	}

	thirdPartyFactory.getTrackAnalysis = function(url){
		return $http.get(url);
	}

	thirdPartyFactory.getRelated = function(id){	
	};

	thirdPartyFactory.getSpotifyDetails = function(id){

		// https://api.spotify.com/v1/albums/{id}/tracks
		id = id.replace("spotify:track:", "");
		apiStr = URL_SPOTIFY_API + "tracks/" + id;
		return $http.get(apiStr);
	};
	
	return thirdPartyFactory;

});