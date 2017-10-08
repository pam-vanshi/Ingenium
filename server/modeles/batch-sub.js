const mongoose = require('mongoose');



var BatchSubSchema = new mongoose.Schema({
   batch: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Batch'
   }],
   subject: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Subject'
   }]

})


var BatchSub = mongoose.model('BatchSub', BatchSubSchema)

module.exports = {
  BatchSub}
