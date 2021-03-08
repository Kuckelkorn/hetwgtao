const express = require('express');
const router = express.Router();
// Page to add mentions to the users, not operational yet
router
	.get('/', (req, res) => res.render('indev'))
	.get('/toevoegen', (req, res) => res.render('adding_mentions'));
// .post('/add_mention', addMention );

module.exports = router
