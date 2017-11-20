const mongoose = require('mongoose');



var BatchSubStudentSchema = new mongoose.Schema({
   batchsub: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'BatchSub'
   }],
   student: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Student'
   }]

})


var BatchSubStudent = mongoose.model('BatchSubStudent', BatchSubStudentSchema)

module.exports = {
  BatchSubStudent}
