const mongoose = require('mongoose');

const mentionsSchema = mongoose.Schema({
	kind:{
		type: String,
		required: true
	},
	message:{
		type: String,
	}
})

module.exports = mongoose.model('Mentions', mentionsSchema)