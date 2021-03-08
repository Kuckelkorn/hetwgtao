const express = require('express');
const router = express.Router();
const Board = require('../models/board.js');
const Member = require('../models/member.js');
const bcrypt = require('bcryptjs');
const Committee = require('../models/committee.js');


router
	.get('/', showBoard)
	.get('/wijzigen', isBoard, getMembers)
	.get('/leden/toevoegen', isBoard, (req, res) => {res.render('adding_members')})
	.post('/add_member',  addMember)
	.post('/add&chang_committee', changeCommittee)
	.post('/add_board', changeBoard);

// Rendering the board page not much to see here just yet. 
async function showBoard (req, res ){
	res.render('board')
}

// Finding members based on their status in the association either active or reunionist
async function getMembers (req, res){
	let actief = await findMembers('Actief');
	let reunisten = await findMembers('Reunist');
	res.render('change_board', {actief, reunisten})
}


// finding all members based on their status
function findMembers (status) {
	return new Promise((resolve, reject) => {
		try {
			let data =  Member.find({status: status})
			resolve(data)
		} catch (err) {
			reject(console.log(err))
		}
	})
}

// Changing the board to the new board
async function changeBoard(req, res){
	const board = new Board();
	// Get the names from the body and split them in an array (Firstname and Lastname)
	let praetorArr = req.body.praetor.split(" ");
	let propraetorArr = req.body.propraetor.split(" ");
	let curatorArr = req.body.curator.split(" ");
	let quaestorArr = req.body.quaestor.split(" ");
	let update = {
		name: 'Bestuur',
		praeses : await Member.find({firstname: praetorArr[0], lastname:praetorArr[1]}, '_id'),
		vp: await Member.find({firstname: propraetorArr[0], lastname: propraetorArr[1]}, '_id'),
		abactis: await Member.find({firstname: curatorArr[0], lastname:curatorArr[1]}, '_id'),
		fiscus: await Member.find({firstname: quaestorArr[0], lastname:quaestorArr[1]}, '_id')
	}
	// Update the committee collection with the new board
	await Committee.findOneAndReplace({name: 'Bestuur'}, update, {
		new: true,
		upsert: true
	})

	// Adding the new board to the collection with all the previous boards
	board.praetor = await Member.find({firstname: praetorArr[0], lastname:praetorArr[1]}, '_id');
	board.propraetor = await Member.find({firstname: propraetorArr[0], lastname: propraetorArr[1]}, '_id');
	board.curator = await Member.find({firstname: curatorArr[0], lastname:curatorArr[1]}, '_id');
	board.quaestor = await Member.find({firstname: quaestorArr[0], lastname:quaestorArr[1]}, '_id');
	board.save((err) => {
		if (err){
			console.log(err);
			return;
		} else {
			res.redirect('/bestuur');
		}
	})
	return;
}

// Adding new members to the site
// No registration form because it is a closed membership
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
			res.redirect('/bestuur/leden/toevoegen');
		}
	})
	return;
}

// Adding a new committee or changing an existing one
async function changeCommittee (req, res){
	let pArr = req.body.praetor.split(" ");
	let vpArr = req.body.propraetor.split(" ");
	let abArr = req.body.curator.split(" ");
	let fArr = req.body.quaestor.split(" ");
	let update = {
		name: req.body.name,
		praeses : await Member.find({firstname: pArr[0], lastname:pArr[1]}, '_id'),
		vp: await Member.find({firstname: vpArr[0], lastname: vpArr[1]}, '_id'),
		abactis: await Member.find({firstname: abArr[0], lastname:abArr[1]}, '_id'),
		fiscus: await Member.find({firstname: fArr[0], lastname:fArr[1]}, '_id')
	}
	await Committee.findOneAndReplace({name: req.body.name}, update, {
		new: true,
		upsert: true // This makes sure that if their is no committee found with this name it adds it to the collection
	})
	res.redirect('/commissies')
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Check if the user is part of the board otherwise you can't acces the pages to add members or change the board
function isBoard (req, res, next){
	if (res.locals.bestuur === true){
		return next();
	} else {
		res.redirect('/bestuur')
	}
}

module.exports = router