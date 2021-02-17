const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');
const bcrypt = require('bcryptjs');
// const memberUtil = require('../utilities/memberUtil.js');


const ascending = 1

router
	.get('/', showMembers)
	.get('/toevoegen', (req, res) => res.render('adding_members'))
	.post('/add_member', addMember );

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

async function addMember (req, res) {
	const member = new Member();
	const salt = await bcrypt.genSaltSync();
	const password = await bcrypt.hash(req.body.password, salt);
	member.firstname= capitalizeFirstLetter(req.body.firstname);
	member.particle=req.body.particle;
	member.lastname= capitalizeFirstLetter(req.body.lastname);
	member.email= req.body.email;
	member.phonenumber= req.body.phonenumber;
	member.birthday= req.body.birthday;
	member.status=req.body.status;
	member.year= req.body.year;
	member.password= password;
	member.save((err) => {
		if (err){
			console.log(err);
			return;
		} else {
			res.redirect('/leden/toevoegen');
		}
	})
	return;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router

