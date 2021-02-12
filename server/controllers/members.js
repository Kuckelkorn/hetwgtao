const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../models/member.js');
const bcrypt = require('bcryptjs');

const decending = -1
const ascending = 1

router
    .get('/', showMembers)
    .get('/toevoegen', (req, res) => res.render('adding_members'))
    .post('/add_member', addMember );

async function showMembers (req, res, next) {
    let members = await findMembers();
    console.log(members);
    res.render(('memberlist'), {
        members
    });
};

function findMembers () {
	return new Promise(async (resolve, reject) => {
			try {
				let data = await Member.find().sort({year:ascending}).sort({lastname:1})
                console.log(data)
				resolve(data)
			} catch (err) {
				reject(console.log(err))
			}
		})
	};

async function addMember (req, res) {
    const member = new Member();
    const salt = await bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);
    member.firstname= req.body.firstname;
    member.lastname= req.body.lastname;
    member.email= req.body.email;
    member.phonenumber= req.body.phonenumber;
    member.birthday= req.body.birthday;
    member.year= req.body.year;
    member.password= password;
    member.save((err) =>{
        if (err){
            console.log(err);
            return;
        } else {
            res.redirect('/leden/toevoegen');
        }
    })
    return;
};

module.exports = router

