 angular.module('songCtrl', ['thirdPartyService', 'ngCookies', 'trackService'])

 .controller('songsController',function($routeParams, ThirdParty, Track){

 	var vm = this

 	vm.query = $routeParams.query;
 	vm.type = $routeParams.type;
    vm.source = $routeParams.source;

 	vm.error="";
 	vm.songs = null;
 	vm.processing = true;

    vm.sc_songs = null;

 	if (vm.query && vm.type && vm.source){

        if (vm.source === "spotify"){

    		ThirdParty.searchSpotify(vm.query, vm.type)

    			.success(function(data) {

    				// done processing
    				vm.processing = false;

    				// bind the songs that come back
    				vm.songs = data.response.songs;
    		    })
    		    .error(function(data){
    		    	vm.processing = false;
    		    	vm.error = data.response.status.message;
    		    });
        }
        else if (vm.source === "soundcloud"){
      
            ThirdParty.searchSoundCloud(vm.query, vm.type)
         
                .success(function(data) {
         
                // done processing
                 vm.processing = false;
         
                // bind the songs that come back
                vm.sc_songs = data;
            })
            .error(function(data){
                vm.processing = false;
                vm.error="An unknown error occurred when searching SoundCloud. Err: " + data;
            });   


        }
        else if (vm.source === "songvis"){

            if (vm.type === "artist") {

                Track.artist(vm.query)
                    .success(function(data){
                        vm.processing = false;
                        vm.sv_songs = data;
                    })
                    .error(function(data){
                        vm.processing = false;
                        vm.error="Error searching SongVis for " + vm.query + ". Err: " + data;
                    });
            }
            else if (vm.type === "genre"){
                
                Track.genre(vm.query)
                    .success(function(data){
                        vm.processing = false;
                        vm.sv_songs = data;
                    })
                    .error(function(data){
                        vm.processing = false;
                        "Error searching SongVis for " + vm.query + ". Err: " + data;
                    });

            }
            else{
                vm.processing = false;
                vm.error = "Invalid SongVis search type.  Using the SongVis service only Artist and Genre searches are available."
            }

        }
        else{
            vm.processing = false;
            vm.error = "Invalid Music Service. Only SongVis, Spotify and SoundCloud are currently supported";     
        }
    }
	else{
		vm.processing = false;
		vm.error = "Please enter search data";
	}

})


.controller('songController', function($routeParams, ThirdParty, Track){
	// Controller to handle Echonest track data. 
	// First makes a call to request the audio summary then makes another call 
	// to get the full detailed track data.


    // UPDATE - This could use refactoring to make easier to read/understand...

 	var vm = this;

 	vm.processing = true;
 	vm.track_processing = false;
    vm.spotify_processing = false;
 	vm.error = null;

 	vm.track = null;
    vm.preview_url = null;

    vm.sc_track = null;
    vm.stream_url = null;

 	vm.relatedSongs = null;

    vm.sc_stream_url = ""


    if ($routeParams.song_id.indexOf("spotify") != -1 ){   // is this is spotify ID?

        vm.spotify_processing = true;
        // Getting detailed data requires two calls...
        // first to get track summary data
     	ThirdParty.getTrackSummaryById($routeParams.song_id).
     		success(function(data){

     			vm.processing = false;
     			vm.track_processing = true;
     			vm.track = data.response.track;
     			vm.track.detail = null;

     			//second to get detailed data using analysis_url
     			ThirdParty.getTrackAnalysis(data.response.track.audio_summary.analysis_url)
     				.success(function(data){
     					vm.track.detail = data;
     					vm.track_processing = false;
     				})
     				.error(function(data){
     					vm.track_processing = false;
     					vm.error =  data;
     				});

     		})
     		.error(function(data){

     			vm.processing = false;
     			vm.error = data.response.status.message;
     		});

        ThirdParty.getSpotifyDetails($routeParams.song_id)
            .success(function(data){

                vm.spotify_processing = false;
                vm.preview_url = data.preview_url;

            })
            .error(function(data){

                vm.spotify_processing = false;
                vm.error = data.error.message;
            });
    }
    else if ($routeParams.song_id.indexOf("soundcloud") != -1 ){   // is this is soundcloud ID?
        song_id = $routeParams.song_id.replace("soundcloud:", "");

        // first get track info from SoundCloud
        ThirdParty.getSoundCloudTrack(song_id)
            .success(function(data){
                vm.processing = false;
                vm.track_processing = true;
                vm.sc_track = data;

                console.log(data);

                var post_data = {}
                post_data.url = vm.sc_track.stream_url;
                vm.sc_stream_url = vm.sc_track.stream_url + "?client_id=eb9e90c60d35fed9afe8fd7836ac7878"

                // Then send to analyzer for track analysis
                ThirdParty.analyzeTrackByUrl(post_data)
                    .success(function(data){
                        vm.sc_track.info = data.response.track;
                    
                        ThirdParty.getTrackSummaryById(vm.sc_track.info.id)
                            .success(function(data){

                                vm.sc_track.en_track = data.response.track;
                               
                                //final get detailed data using analysis_url
                                ThirdParty.getTrackAnalysis(data.response.track.audio_summary.analysis_url)
                                    .success(function(data){
                                        vm.sc_track.detail = data;
                                        vm.track_processing = false;
                                    })
                                    .error(function(data){
                                        vm.track_processing = false;
                                        vm.error = "Error accessing Echnonest: " + data;
                                    });
                            })
                            .error(function(data){
                                vm.track_processing = false;
                                vm.error = "Error accessing Echnonest: " + data;
                            });
                        
                        
                    })
                    .error(function(data){
                        vm.track_processing = false;
                        vm.error = "Error accessing Echnonest: " + data;
                    });


            })
            .error(function(data){
                vm.track_processing = false;
                vm.error = "Error accessing SoundCloud: " + data.errors[0].error_message;
            });

    }
    else if ($routeParams.song_id.indexOf("songvis") != -1 ){   // is this is songvis ID?

        vm.processing = false;
        vm.track_processing = true;
        song_id = $routeParams.song_id.replace("songvis:", "");

        Track.get(song_id)
            .success(function(data){

                vm.sv_track = data
                vm.track_processing = false;
            })
            .error(function(data){
                vm.track_processing = false;
                vm.error = "Error accessing SongVis: " + data;
            });

    }
    else{
        vm.error = "Invalid ID.  Song ID must contain either spotify, soundcloud, or songvis"
    }

 });