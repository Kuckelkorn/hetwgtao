const Varia = require("../models/varia");

exports.findVaria = function () {
  return new Promise((resolve, reject) => {
    try {
      let data = Varia.find().sort({date:-1})
        .populate('name')
      resolve(data);
    } catch (err) {
      reject(console.log(err))
    }
  })
}