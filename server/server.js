const express = require('express');
const path = require('path');
const members = require('./controllers/members.js');
const mentions = require('./controllers/mentions.js');


// Initialize Application
const app = express();


//Routes
app
    .use('/static', express.static('./static'))
    .set('view engine', 'pug')
    .set('views', './server/views')
    .get('/', (req, res) =>{res.render('index')})
    .use('/leden', members)
    .use('/mededelingen', mentions);

// Starting Server
app.listen(5555, ()=> {
    console.log('Server started at port 5555');
});