require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const members = require('./controllers/members.js');
const mentions = require('./controllers/mentions.js');
const board = require('./controllers/board.js');
const Member = require('./models/member.js');
const bcrypt = require('bcryptjs');


// Initialize Application
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

//Routes
app
	.use('/static', express.static('./public/static'))
	.set('view engine', 'pug')
	.set('views', './server/views')
	.use(bodyParser.urlencoded({ extended: true }))
	.get('/', (req, res) => {res.render('index')})
	.use('/leden', members)
	.use('/mededelingen', mentions)
	.use('/bestuur', board)
	.post('/login', login)
	.use((req, res) => { res.status(404).render('404')});

// Starting Server
app.listen(5555, () => {
	console.log('Server started at port 5555');
});

async function login (req, res) {
	try{
		const member = await Member.findOne({email : req.body.email});
		if (member === null ){
			console.log('email niet bekend');
		} else if (member) {
			const match = await bcrypt.compare(req.body.password, member.password);
			console.log(match)
			if (match === true){
				res.redirect('/mededelingen');
			} else {
				console.log('Verkeerd wachtwoord')
			}
		}
	} catch (err) {
		console.log(err);
	}
}
