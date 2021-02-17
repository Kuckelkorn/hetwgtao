const mongoose = require('mongoose');
const Member = require('./member.js');

const boardSchema = mongoose.Schema({
    praetor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    propraetor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    curator:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    quaestor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]
})


module.exports = {
    Board :mongoose.model('Board', boardSchema)
}

