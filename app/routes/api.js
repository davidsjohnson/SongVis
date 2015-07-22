var bodyParser = require('body-parser'); 	// get body-parser
var Track      = require('../models/track');
var Artist     = require('../models/artist');
var Genre      = require('../models/genre');
var config     = require('../../config');


module.exports = function(app, express) {

	var apiRouter = express.Router();

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Welcome to the SongVis Track Analysis API' });	
	});


	// on routes that end in /tracks
	// ----------------------------------------------------
	apiRouter.route('/tracks')

		// get all the tracks (accessed at GET http://localhost:8080/api/tracks)
		.get(function(req, res) {

			Track.find({}, function(err, tracks) {
				if (err) res.send(err);

				// return the users
				res.json(tracks);
			});
		});


	apiRouter.route('/tracks/:track_id')

		// get the track with that id
		.get(function(req, res) {
			Track.findById(req.params.track_id, function(err, track) {
				if (err) res.send(err);

				// return that user
				res.json(track);
			});
		});

	apiRouter.route('/tracks/genre/:genre')

		// get all the tracks of the specified genre
		//(accessed at GET http://localhost:8080/api/genre/Rap)
		.get(function(req, res) {

			Track.find({genre: req.params.genre}, function(err, tracks) {
				if (err) res.send(err);

				// return the tracks
				res.json(tracks);
			});
		});

	apiRouter.route('/tracks/artist/:artist')

		// get all the tracks of the specified artist
		//(accessed at GET http://localhost:8080/api/genre/Rap)
		.get(function(req, res) {

			Track.find({artist: req.params.artist}, function(err, tracks) {
				if (err) res.send(err);

				// return the tracks
				res.json(tracks);
			});
		});

	apiRouter.route('/genres')

		// get list of all the genres in database
		//(accessed at GET http://localhost:8080/api/genres)
		.get(function(req, res) {

			Genre.find({}, function(err, genres) {
				if (err) res.send(err);

				// return the genres
				res.json(genres);
			});
		});

	apiRouter.route('/artists')

		// get list of all the artists in database
		//(accessed at GET http://localhost:8080/api/genres)
		.get(function(req, res) {

			Artist.find({}, function(err, artists) {
				if (err) res.send(err);

				// return the genres
				res.json(artists);
			});
		});

	return apiRouter;

}