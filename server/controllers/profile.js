const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');

// Profile route to change your own profile
router
	.get('/:lastname&:firstname', showProfile)
	.get('/:lastname&:firstname/wijzigen', changeProfile)
	.post('/:lastname&:firstname/change_email', changeEmail)
	.post('/:lastname&:firstname/change_number', changeNumber)
	.post('/:lastname&:firstname/change_study', changeStudy)
	.post('/:lastname&:firstname/change_address', changeAddress);

// Rendering profile page
async function showProfile (req, res){
	let member = await findProfile (req.params.firstname, req.params.lastname);
	res.render(('profile'), {
		member
	});
}

// Finding the correct profile for the user logged in
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

// Rendering the page to change your own profile
async function changeProfile (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname)
	if (member.id === res.locals.user.id){
		res.render('change_profile', {
			member
		});
	} else {
		res.redirect('/')
	}
}

// If the user wants to just change their email
async function changeEmail (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname);
	let data = {}
	data.email= req.body.email;
	let query = {
		firstname: capitalizeFirstLetter(req.params.firstname),
		lastname:capitalizeFirstLetter(req.params.lastname)
	}
	Member.updateOne(query, data, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/lid/'+member.lastname+'&'+member.firstname+'/wijzigen')
		}
	})
	return;
}

// Function for if the user just wants to change their own phonenumber
async function changeNumber (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname);
	let data = {}
	data.phonenumber= req.body.phonenumber;
	let query = {
		firstname: capitalizeFirstLetter(req.params.firstname),
		lastname:capitalizeFirstLetter(req.params.lastname)
	}
	Member.updateOne(query, data, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/lid/'+member.lastname+'&'+member.firstname+'/wijzigen')
		}
	})
	return;
}

// Function to change the study of the user
async function changeStudy (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname);
	let data = {}
	data.study= req.body.study;
	let query = {
		firstname: capitalizeFirstLetter(req.params.firstname),
		lastname:capitalizeFirstLetter(req.params.lastname)
	}
	await Member.updateOne(query, data, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/lid/'+member.lastname+'&'+member.firstname+'/wijzigen')
		}
	})
	return;
}

// Function to change the Address of the user
async function changeAddress (req, res) {
	let member = await findProfile (req.params.firstname, req.params.lastname);
	let data = {}
	data.street=req.body.street;
	data.postalcode= req.body.postalcode;
	data.place= req.body.place;
	let query = {
		firstname: capitalizeFirstLetter(req.params.firstname),
		lastname:capitalizeFirstLetter(req.params.lastname)
	}
	Member.updateOne(query, data, (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/lid/'+member.lastname+'&'+member.firstname+'/wijzigen')
		}
	})
	return;
}

// Function to capitalize the first letter 
// this function exists because in the string the name 
//has no capital letters and in the database they do have capitalized letters
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router