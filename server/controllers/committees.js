const express = require('express');
const router = express.Router();
const Committee = require('../models/committee.js');

router
	.get('/', (req, res) => { res.render('indev')});

module.exports = router
