const mongoose = require('mongoose');


var AttendanceSchema = new mongoose.Schema({
  createdAt: {
    type: String

  } ,
  student: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BatchSubStudent'
  }],
  value: {
    type: String
  }

})



var Attendance = mongoose.model('Attendance', AttendanceSchema)

module.exports = {
  Attendance}
