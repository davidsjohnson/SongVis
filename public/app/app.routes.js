 angular.module('app.routes', ['ngRoute'])

// Configuring the routes
.config(function($routeProvider, $locationProvider){

	$routeProvider

	// Route for home page
	.when("/", {
		templateUrl: 'app/views/pages/home.html',
		controller: 'mainController',
		controllerAs: 'main'
	})
	.when("/songs", {

		templateUrl: 'app/views/pages/songs.html',
		controller: 'songsController',
		controllerAs: 'song'
	})
	.when("/songs/:song_id", {
		templateUrl: 'app/views/pages/songvis.html',
		controller: 'songController',
		controllerAs: 'song'

	});

	// Added to remove the # from URLs
	$locationProvider.html5Mode(true);
});