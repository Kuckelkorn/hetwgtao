const Board = require("../models/board");

exports.findBoard = function () {
	return new Promise((resolve, reject) => {
		try {
			let data = Board.findOne()
				.sort({_id: -1})
				.populate('praetor', 'lastname' )
				.populate('propraetor', 'lastname' )
				.populate('curator', 'lastname' )
				.populate('quaestor', 'lastname' )
				.limit(1);
			resolve(data);
		} catch (err) {
			reject(console.log(err))
		}
	})
};

