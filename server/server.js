// Server app setup & routes with stored sessions for role allocation and user recognition


// All required modules & variables
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const members = require('./controllers/members.js');
const profile = require('./controllers/profile.js');
const mentions = require('./controllers/mentions.js');
const board = require('./controllers/board.js');
const committees = require('./controllers/committees.js')
const passport = require('passport');
require('./Utilities/passportUtil.js')(passport);
const boardUtil = require('./Utilities/boardUtil.js');
let port = process.env.PORT || 5555


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
	.use('*', saveLocal)		
	.get('/', showIndex)
	.get('/login', (req, res) => {res.render('login')})
	.get('/logout', logout)
	.post('/login', login)
	.use('/leden', loggedIn, saveBoard, members)
	.use('/lid', loggedIn, saveBoard, profile)
	.use('/mededelingen', loggedIn, saveBoard, mentions)
	.use('/bestuur', loggedIn, saveBoard, board)
	.use('/commissies', committees)
	.get('/varia', (req, res) => {res.render('indev')})
	.get('/kalender', (req, res) => {res.render('indev')})
	.use((req, res) => { res.status(404).render('404')});
	
// Starting Server
app.listen(port, () => {
	console.log('Server started at port ' + port);
});

// Logging in the user if the user is logged in redirect to different page otherwise redirect to login page
function login (req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/mededelingen',
		failureRedirect: '/login'
	})(req, res, next);
}

// Logging the user out and destroying the session
function logout(req, res ){
	req.logout();
	req.session.destroy(); 
	res.redirect('/');
}

// Setup session to use res.locals for the user
function saveLocal (req, res, next){
	res.locals.user = req.user || null;
	next();
}

// Check if user is logged in 
function loggedIn (req, res, next){
	if (req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

// Check if the user is part of the Board of the association if not some actions are unavailable
async function saveBoard(req, res, next){
	let latestBoard = await boardUtil.findBoard();
	if (res.locals.user.id === latestBoard.praetor[0].id || 
		res.locals.user.id === latestBoard.curator[0].id ||
		res.locals.user.id === latestBoard.quaestor[0].id) {
		res.locals.bestuur = true;
		next()
	} else if (latestBoard.propraetor.length > 0  && res.locals.user.id === latestBoard.propraetor[0].id ){
		res.locals.bestuur = true
		next()
	} else {
		res.locals.bestuur = false
		next()
	}
}

// Rendering the index page with the members of the board
async function showIndex (req, res){
	let board = await boardUtil.findBoard();
	res.render('index', board)
}