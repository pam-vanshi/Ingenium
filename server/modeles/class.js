const mongoose = require('mongoose');



var ClassSchema = new mongoose.Schema({
  class: {
  type: String
  }

})


var Class = mongoose.model('Class', ClassSchema)

module.exports = {
  Class}
  
