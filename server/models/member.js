const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	firstname:{
		type: String,
		required: true
	},
	lastname:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	phonenumber:{
		type: Number,
		required: true,
		unique: true
	},
	status:{
		type: String,
		required: true
	},
	year:{
		type: Number,
		required: true
	},
	birthday:{
		type: Date,
		required: true
	},
	street:{
		type: String
	},
	housenumber:{
		type: String
	},
	postalcode:{
		type: String
	},
	password:{
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Member', memberSchema)