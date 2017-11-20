const mongoose = require('mongoose');


var FeeSchema = new mongoose.Schema({
  monthyear: {
    type: String

  } ,
  student: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  paid: Boolean

})



var Fee = mongoose.model('Fee', FeeSchema)

module.exports = {
  Fee}
