const express = require('express');
const router = express.Router();
const {Board} = require('../models/board.js');
const Member = require('../models/member.js');
const reunionistBoard = {
	r1: '',
	r2: '',
	r3: '',
	r4: '',
};



router
	.get('/', showBoard)
	.get('/wijzigen', showBoard)
	.post('/add_board', addBoard)
	.post('/change_rBoard', changeRBoard);

async function showBoard (req, res){
	// let board = await findBoard();
	let actief = await findMembers('Actief');
	let reunisten = await findMembers('Reunist');
	res.render('change_board', {actief, reunisten})
}

// function findBoard () {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let data = Board.findOne()
// 				.sort({_id: -1})
// 				.populate('praetor', 'lastname' )
// 				.populate('propraetor', 'lastname' )
// 				.populate('curator', 'lastname' )
// 				.populate('quaestor', 'lastname' )
// 				.limit(1);
// 			resolve(data);
// 		} catch (err) {
// 			reject(console.log(err))
// 		}
// 	})
// }

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
	let praetorA = req.body.praetor.split(" ");
	let propraetorA = req.body.propraetor.split(" ");
	let curatorA = req.body.curator.split(" ");
	let quaestorA = req.body.quaestor.split(" ");
	board.praetor = await Member.find({firstname: praetorA[0], lastname:praetorA[1]}, '_id');
	board.propraetor = await Member.find({firstname: propraetorA[0], lastname: propraetorA[1]}, '_id');
	board.curator = await Member.find({firstname: curatorA[0], lastname:curatorA[1]}, '_id');
	board.quaestor = await Member.find({firstname: quaestorA[0], lastname:quaestorA[1]}, '_id');
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

async function changeRBoard(req, res){
	let reunist1 = req.body.r1.split(" ");
	let reunist2 = req.body.r2.split(" ");
	let reunist3 =req.body.r3.split(" ");
	let reunist4 =req.body.r4.split(" ");
	reunionistBoard.r1=await Member.find({firstname:reunist1[0], lastname:reunist1[1]}); 
	reunionistBoard.r2=await Member.find({firstname:reunist2[0], lastname:reunist2[1]}); 
	reunionistBoard.r3=await Member.find({firstname:reunist3[0], lastname:reunist3[1]}); 
	reunionistBoard.r4=await Member.find({firstname:reunist4[0], lastname:reunist4[1]}); 
	res.redirect('/bestuur');
}


module.exports = router