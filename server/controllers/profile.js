const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');


router
	.get('/:lastname&:firstname', showProfile)
	.get('/:lastname&:firstname/wijzigen', changeProfile);


async function showProfile (req, res){
	let member = await findProfile (req.params.firstname, req.params.lastname);
	res.render(('profile'), {
		member
	});
}
function findProfile(fname, lname){
	return new Promise ( (resolve, reject ) => {
		try {
			let member = Member.findOne({
				firstname: capitalizeFirstLetter(fname),
				lastname:capitalizeFirstLetter(lname)
			})
			resolve(member)
		} catch(err){
			reject(console.log(err))
		}

	})
}
async function changeProfile (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname)
	// console.log(member);
	// console.log(res.locals.user);
	if (member.id === res.locals.user.id){
		res.render('change_profile');
	} else {
		res.redirect('/')
	}
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router