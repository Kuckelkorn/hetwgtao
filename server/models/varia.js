const mongoose = require('mongoose');

const variaSchema = mongoose.Schema({
  name: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  }],
  date: {
    type: Date,
  },
  varia: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Varia', variaSchema);