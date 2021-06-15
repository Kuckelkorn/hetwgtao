const Committee = require("../models/committee");

// Function to find the latest board
exports.findCommittees = function () {
  return new Promise((resolve, reject) => {
    try {
      let data = Committee.find({name : {$ne: 'Bestuur'}})
        .populate('praeses')
        .populate('vp')
        .populate('fiscus')
        .populate('abactis')
        .populate('nestor')
        .populate('leden')
      resolve(data);
    } catch (err) {
      reject(console.log(err))
    }
  })
};