var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GenreSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Genre', GenreSchema);