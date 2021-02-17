const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	firstname:{
		type: String,
		required: true
	},
	particle:{
		type: String
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
	password:{
		type: String,
		required: true
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
	deathday:{
		type: Date
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
	study:{ 
		type: String
	},
	saldo:{
		type: Number
	}
})

module.exports = mongoose.model('Member', memberSchema)