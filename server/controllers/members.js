const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router
    .get('/', (req,res) => res.render('memberlist'))
    .get('/toevoegen', (req, res) => res.render('adding_members'));
    // .post('/add_member', addMember )

module.exports = router

