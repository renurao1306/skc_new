const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brandsSchema = new Schema({
	'topcomps' : Array,
	'type' : String
});

module.exports = mongoose.model('topcomps', brandsSchema);
