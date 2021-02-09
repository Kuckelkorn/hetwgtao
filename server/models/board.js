const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    member:{
        type: String,
        required: true
    },
    function:{
        type: String,
        required: true
    }
})

const Board = module.exports = mongoose.model('Board', boardSchema)