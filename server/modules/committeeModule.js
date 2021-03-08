const Committee = require("../models/committee");

exports.findCommittees = function () {
	return new Promise((resolve, reject) => {
		try {
			let data = Committee.find({name : {$ne: 'Bestuur'}})
				.populate('praeses')
				.populate('vp')
				.populate('fiscus')
				.populate('nestor')
				.populate('lid')
			resolve(data);
		} catch (err) {
			reject(console.log(err))
		}
	})
};