const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');
// const memberUtil = require('../utilities/memberUtil.js');


router
  .get('/', showMembers);

// Rendering the page with all the members of the association 
async function showMembers (req, res) {
  let members = await findMembers();
  res.render(('memberlist'), {
    members
  });
}

// Getting the members from the database and sorting them on year of joining and lastname
// First on oldest members first and then on basis of their last name
function findMembers () {
  return new Promise( (resolve, reject) => {
    try {
      let data = Member.find().sort({year:1}).sort({lastname:1})
      resolve(data)
    } catch (err) {
      reject(console.log(err))
    }
  })
}

module.exports = router

