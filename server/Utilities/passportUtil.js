// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt= require('bcryptjs');
const User = require('../models/member.js');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
		// Match user
			let query = {email : email};
			User.findOne(query, (err, user) => {
				if(err) throw err;
				if (!user){return done(null, false)}
				// Match password 
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch){ return done(null, user)}
					else {return done(null, false)}
				})
			})
		}))
	passport.serializeUser((user, done) => {
		done(null, user.id);
	})
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		})
	})
}