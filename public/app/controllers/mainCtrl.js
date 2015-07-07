 angular.module('mainCtrl', [])

 .controller('mainController', function($location, Song){

 	var vm = this;

 	vm.searchData = "";
 	vm.selected = {};

 	vm.error = "";

 	// available options for song search
 	vm.options = [
 		{	
 			"id"     : "soundcloud",
 			"source" : "SoundCloud",
 			"types" : [
 				{ "type" : {
 					"id" : "keyword",
 					"name": "Keyword"
 					}
 				},
 				{ "type" : {
 					"id" : "genre",
 					"name": "Genre"
 					}
 				} 			
 			]
 		},
 		{
 			"id"     : "spotify",
 			"source" : "Spotify/Echonest",
 			"types" : [
 				{ "type" : {
 					"id" : "genre",
 					"name": "Genre"
 					}
 				},
 				{ "type" : {
 					"id" : "artist",
 					"name": "Artist"
 					}
 				} 
 			]
 		}
 	];

 	vm.search = function(){



 		if (vm.searchData && vm.selected.source && vm.selected.type){
			$location.path("/songs").search("type", vm.selected.type.type.id).search("query", vm.searchData).search("source", vm.selected.source.id);

			// reset variables
		 	vm.searchData = "";
		 	vm.selected = {};
		 	vm.error = "";
		}
 		else
 			vm.error="Please complete search fields.  All fields are required."


 	}

 });