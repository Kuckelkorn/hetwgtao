const mongoose = require('mongoose');
// const Member = require('./member.js');

const boardSchema = mongoose.Schema({
	praetor:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member',
		required: true
	}],
	propraetor:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	curator:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	quaestor:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}]
})


module.exports = mongoose.model('Boards', boardSchema)

