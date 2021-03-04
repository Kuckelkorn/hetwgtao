const mongoose = require('mongoose');

const committeeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	praeses:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	vp:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	abactis:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	fiscus:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	nestor:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	lid: {
		person :[{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Member'
		}]
	}
})


module.exports = mongoose.model('Committees', committeeSchema)