require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const members = require('./controllers/members.js');
const mentions = require('./controllers/mentions.js');
const board = require('./controllers/board.js');
const passport = require('passport');
require('./Utilities/passportUtil.js')(passport);


// Declare Application
const app = express();

//Setting up Database
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true
});
let db = mongoose.connection;

//// Checking for connection
db.once('open', () => {console.log('Connected to database')})
db.on('error', (err) => {console.log(err)})


// Inititialize application

app.use('/static', express.static('./public/static'))
	.set('view engine', 'pug')
	.set('views', './server/views')
	.use(bodyParser.urlencoded({ extended: true }))
	.use(session({ 
		secret: process.env.SESSION_SECRET, 
		resave: false,
		saveUninitialized: true
	}))
	.use(passport.initialize())
	.use(passport.session());

//Routes
app
	.get('/', (req, res) => {res.render('index')})
	.get('/login', (req, res) => {res.render('login')})
	.get('/logout', (req, res) => { req.logout(); res.redirect('/')})
	.post('/login', login)
	.use('/leden', members)
	.use('/mededelingen', mentions)
	.use('/bestuur', board)
	.use((req, res) => { res.status(404).render('404')});
	

// Starting Server
app.listen(5555, () => {
	console.log('Server started at port 5555');
});

function login (req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/mededelingen',
		failureRedirect: '/login'
	})(req, res, next);
}