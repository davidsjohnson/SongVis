 angular.module('mainCtrl', [])

 .controller('mainController', function($location, Track){

 	var vm = this;

 	vm.error = "";

 	Track.artists()
 		.success(function(data){
 			vm.artists = data


		 	Track.genres()
		 		.success(function(data){
		 			vm.genres = data

				 	vm.selected = {};

				 	// available options for song search
				 	vm.options = [
				 		{	
				 			"id"     : "artist",
				 			"searchType" : "Artist",
				 			"choices" : vm.artists
				 		},
				 		{
				 			"id"     : "genre",
				 			"searchType" : "Genre",
				 			"choices" : vm.genres
				 		}
				 	];

		 		})
		 		.error(function(data){
			    	vm.error = data;
		 		});



 		})
 		.error(function(data){
	    	vm.error = data;
 		});


 	vm.search = function(){

 		if (vm.selected.searchType && vm.selected.choice){
			$location.path("/songs").search("type",vm.selected.searchType.id).search("query", vm.selected.choice.name).search("source", "songvis");

			// reset variables
		 	vm.selected = {};
		 	vm.error = "";
		}
 		else
 			vm.error="Please complete search fields.  All fields are required."
 	}

 });