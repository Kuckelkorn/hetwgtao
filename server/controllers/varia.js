const express = require('express');
const router = express.Router();
const Varia = require('../models/varia.js');
const Member = require('../models/member.js');
const variaModule = require('../modules/variaModule.js');

router
  .get('/', showVaria)
  .get('/toevoegen', async (req, res) => {
    let members = await findMembers();
    res.render('add_varia', {members})
  })
  .post('/add_varia', addVaria);


async function showVaria (req, res){
  let varias = await variaModule.findVaria();
  res.render('varia', {varias})
}

async function addVaria (req, res ){
  const varia = new Varia();
  let nameArr = req.body.name.split(" ");
  varia.name = await Member.find({firstname: nameArr[0], lastname: nameArr[nameArr.length -1]}, '_id');
  varia.date = req.body.date;
  varia.varia = req.body.varia;
  varia.save((err) => {
    if (err) {
      console.log(err)
      return;
    } else {
      res.redirect('/varia')
    }
  })
  return;
}

function findMembers () {
  return new Promise((resolve, reject) => {
    try {
      let members =  Member.find()
      resolve(members)
    } catch (err) {
      reject(console.log(err))
    }
  })
}

module.exports = router
