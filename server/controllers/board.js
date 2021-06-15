const express = require('express');
// const date = require('date-fns');
const router = express.Router();
const Board = require('../models/board.js');
const Member = require('../models/member.js');
const bcrypt = require('bcryptjs');
const Committee = require('../models/committee.js');
const boardModule = require('../modules/boardModule.js');



router
  .get('/', showBoard)
  .get('/wijzigen', isBoard, async (req, res) => {
    let members = await findActive();
    res.render('change_board', {members})
  })
  .get('/leden/toevoegen', isBoard, (req, res) => {res.render('adding_members')})
  .get('/commissie/toevoegen|wijzigen', isBoard, async (req, res) => {
    let members = await findActive();
    res.render('add_committee', {members});
  })
  .post('/add_member',  addMember)
  .post('/add&change_committee', changeCommittee)
  .post('/add_board', changeBoard);

// Rendering the board page not much to see here just yet. 
async function showBoard (req, res ){
  let board = await boardModule.findBoard();
  res.render('board', board)
}


// finding all active members
function findActive () {
  return new Promise((resolve, reject) => {
    try {
      let members =  Member.find({status: 'Actief'})
      resolve(members)
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
    praeses : await Member.find({firstname: praetorArr[0], lastname:praetorArr[praetorArr.length -1]}, '_id'),
    vp: await Member.find({firstname: propraetorArr[0], lastname: propraetorArr[propraetorArr.length-1]}, '_id'),
    abactis: await Member.find({firstname: curatorArr[0], lastname:curatorArr[curatorArr.length -1]}, '_id'),
    fiscus: await Member.find({firstname: quaestorArr[0], lastname:quaestorArr[quaestorArr.length -1]}, '_id')
  }
  // Update the committee collection with the new board
  await Committee.findOneAndReplace({name: 'Bestuur'}, update, {
    new: true,
    upsert: true
  })

  // Adding the new board to the collection with all the previous boards
  board.praetor = await Member.find({firstname: praetorArr[0], lastname:praetorArr[praetorArr.length -1]}, '_id');
  board.propraetor = await Member.find({firstname: propraetorArr[0], lastname: propraetorArr[propraetorArr.length-1]}, '_id');
  board.curator = await Member.find({firstname: curatorArr[0], lastname:curatorArr[curatorArr.length -1]}, '_id');
  board.quaestor = await Member.find({firstname: quaestorArr[0], lastname:quaestorArr[quaestorArr.length -1]}, '_id');
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

  console.log(req.body.birthday)
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
  let pArr = req.body.praeses.split(" ");
  let vpArr = req.body.vp.split(" ");
  let abArr = req.body.abactis.split(" ");
  let fArr = req.body.fiscus.split(" ");
  let nArr = req.body.nestor.split(" ");

  const leden = []
  const lidNames =[]
  
  let y = Array.isArray(req.body.lid)
  
  if (y === false){
    let name =req.body.lid.split(" ");
    leden.push(name)
  } else {
    for( let i = 0; i < req.body.lid.length; i++ ){
      let name =req.body.lid[i].split(" ");
      leden.push(name)
    }
  }

  console.log(leden)

  for (let i = 0; i < leden.length; i++) {
    let lid = leden[i]
    let lidName = await Member.find({firstname: lid[0], lastname: lid[lid.length-1]}, '_id')
    lidNames.push(lidName[0])
  }
  
	
  let update = {
    name: req.body.name,
    praeses : await Member.find({firstname: pArr[0], lastname:pArr[pArr.length -1]}, '_id'),
    vp: await Member.find({firstname: vpArr[0], lastname: vpArr[vpArr.length - 1]}, '_id'),
    abactis: await Member.find({firstname: abArr[0], lastname:abArr[abArr.length -1]}, '_id'),
    fiscus: await Member.find({firstname: fArr[0], lastname:fArr[fArr.length -1]}, '_id'),
    nestor: await Member.find({firstname: nArr[0], lastname:nArr[nArr.length-1]}, '_id'),
    leden: lidNames
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