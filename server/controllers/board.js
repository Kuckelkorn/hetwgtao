const express = require('express');
const router = express.Router();
const Board = require('../models/board.js');
const Member = require('../models/member.js');
const bcrypt = require('bcryptjs');


router
	.get('/', showBoard)
	.get('/wijzigen', isBoard, changeBoard)
	.get('/leden/toevoegen', isBoard, (req, res) => {res.render('adding_members')})
	.post('/add_member',  addMember)
	.post('/add_board',  addBoard);


async function showBoard (req, res ){
	res.render('board')
}

async function changeBoard (req, res){
	let actief = await findMembers('Actief');
	let reunisten = await findMembers('Reunist');
	res.render('change_board', {actief, reunisten})
}



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

async function addBoard(req, res){
	const board = new Board();
	let praetorArr = req.body.praetor.split(" ");
	let propraetorArr = req.body.propraetor.split(" ");
	let curatorArr = req.body.curator.split(" ");
	let quaestorArr = req.body.quaestor.split(" ");
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

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBoard (req, res, next){
	if (res.locals.bestuur === true){
		return next();
	} else {
		res.redirect('/bestuur')
	}
}

module.exports = router