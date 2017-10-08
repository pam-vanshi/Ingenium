const mongoose = require('mongoose');



var BatchSchema = new mongoose.Schema({
  section: {
  type: String
},
   coaching: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Centre'
   }],
   class: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Class'
   }]

})


var Batch = mongoose.model('Batch', BatchSchema)

module.exports = {
  Batch}
