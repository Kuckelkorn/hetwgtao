const mongoose = require('mongoose');

const mentionsSchema = mongoose.Schema({
    kind:{
        type: String,
        required: true
    },
    message:{
        type: String,
    }
})

const Mentions = module.exports = mongoose.model('Mentions', mentionsSchema)