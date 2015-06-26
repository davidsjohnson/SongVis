 angular.module('songCtrl', ['songService'])

 .controller('songsController', function($routeParams, Song){

 	var vm = this

 	vm.query = $routeParams.query;
 	vm.type = $routeParams.type;

 	vm.error="";
 	vm.songs = null;
 	vm.processing = true;

 	if (vm.query && vm.type){

		Song.search(vm.query, vm.type)

			.success(function(data) {

				// when all the users come back, remove the processing variable
				vm.processing = false;

				// bind the songs that come back
				vm.songs = data.response.songs;

				console.log(vm.songs[0]);
		    })
		    .error(function(data){
		    	vm.processing = false;
		    	vm.error = data.response.status.message;
		    });
	}
	else{
		vm.processing = false;
		vm.error = "Please enter search data"
	}

 })

 .controller('songController', function($routeParams, Song){

 	var vm = this;

 	vm.processing = true;
 	vm.error = null;
 	vm.relatedSongs = null;

 	Song.getTrackData($routeParams.song_id).
 		success(function(data){

 			vm.processing = false;
 			vm.songData = data.response;
 		})
 		.error(function(data){

 			vm.processing = false;
 			vm.error = data.response.status.message;
 		});

 });