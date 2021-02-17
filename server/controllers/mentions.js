const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => res.render('mentions'))
	.get('/toevoegen', (req, res) => res.render('adding_mentions'));
// .post('/add_member', addMention );

module.exports = router
