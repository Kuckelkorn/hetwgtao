const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');
// const memberUtil = require('../utilities/memberUtil.js');


const ascending = 1

router
	.get('/', showMembers);

async function showMembers (req, res) {
	let members = await findMembers();
	res.render(('memberlist'), {
		members
	});
}

function findMembers () {
	return new Promise( (resolve, reject) => {
		try {
			let data = Member.find().sort({year:ascending}).sort({lastname:1})
			resolve(data)
		} catch (err) {
			reject(console.log(err))
		}
	})
}

module.exports = router

