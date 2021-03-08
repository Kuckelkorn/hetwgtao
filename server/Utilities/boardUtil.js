const Board = require("../models/board");

// Function to find the latest board
exports.findBoard = function () {
	return new Promise((resolve, reject) => {
		try {
			let data = Board.findOne()
				.sort({_id: -1})
				.populate('praetor')
				.populate('propraetor')
				.populate('curator')
				.populate('quaestor')
				.limit(1);
			resolve(data);
		} catch (err) {
			reject(console.log(err))
		}
	})
};

