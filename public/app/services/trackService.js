angular.module('trackService', [])

.factory('Track', function($http) {

	// create a new object
	var trackFactory = {};

	trackFactory.all = function(){
		return $http.get("/api/tracks/");
	};

	trackFactory.get = function(id){
		return $http.get("/api/tracks/" + id);
	};

	trackFactory.genre = function(genre){
		return $http.get("/api/tracks/genre/" + genre);
	};

	trackFactory.artist = function(artist){
		return $http.get("/api/tracks/artist/" + artist);
	}

	trackFactory.genres = function(){
		return $http.get("/api/genres/")
	};

	trackFactory.artists = function(){
		return $http.get("/api/artists/")
	};

	return trackFactory

});