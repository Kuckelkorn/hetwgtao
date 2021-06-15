const express = require('express');
const router = express.Router();
const committeeModule = require('../modules/committeeModule.js');


router
  .get('/', showCommittees);


async function showCommittees (req, res) {
  let committees = await committeeModule.findCommittees();
  res.render('committees', {committees})
}

module.exports = router
