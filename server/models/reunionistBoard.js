const mongoose = require('mongoose');

const reunistBoardSchema = mongoose.Schema({
    member:{
        type: String,
        required: true
    },
    function:{
        type: String,
        required: true
    }
})

const reunistBoard = module.exports = mongoose.model('reunistBoard', reunistBoardSchema)