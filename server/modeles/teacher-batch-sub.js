const mongoose = require('mongoose');



var TeacherBatchSubSchema = new mongoose.Schema({
   batchsub: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'BatchSub'
   }],
   teacher: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Teacher'
   }]

})


var TeacherBatchSub = mongoose.model('TeacherBatchSub', TeacherBatchSubSchema)

module.exports = {
  TeacherBatchSub}
