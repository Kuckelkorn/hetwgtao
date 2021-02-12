require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const members = require('./controllers/members.js');
const mentions = require('./controllers/mentions.js');


// Initialize Application
const app = express();

//Setting up Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
let db = mongoose.connection;

//// Checking for connection
db.once('open', ()=>{console.log('Connected to database')})
db.on('error', (err)=>{console.log(err)})

//Routes
app
    .use('/static', express.static('./static'))
    .set('view engine', 'pug')
    .set('views', './server/views')
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/', (req, res) =>{res.render('index')})
    .use('/leden', members)
    .use('/mededelingen', mentions);

// Starting Server
app.listen(5555, ()=> {
    console.log('Server started at port 5555');
});
