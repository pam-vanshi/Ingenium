const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {BatchSubStudent} = require('../modeles/batch-sub-student.js')

var {Attendance} = require('../modeles/attendance.js')

router.post('/attendance', (req,res) => {
  var body = _.pick(req.body,['student','value'])
  var attendance = new Attendance();
  attendance.value = body.value
  var date = new Date(Date.now()).toISOString();
  attendance.createdAt = date;

  BatchSubStudent.findById(body.student).then((batchsubstudent) => {
    attendance.student.push(batchsubstudent)
    attendance.save().then((attendance) => {
      res.send(attendance)
    })
  })
})

module.exports = router
