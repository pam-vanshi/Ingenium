const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {BatchSubStudent} = require('../modeles/batch-sub-student.js')
var {BatchSub} = require('../modeles/batch-sub.js')
var {Student} = require('../modeles/student.js')


router.post('/', (req,res) => {
  var body = _.pick(req.body, ['student','batchsubid'])
  var batchsubstudent = new BatchSubStudent()
  BatchSub.findById(body.batchsubid).then((batchsub) => {
    batchsubstudent.batchsub.push(batchsub)
    Student.findOne({name:body.student}).then((student) => {
      batchsubstudent.student.push(student)
      batchsubstudent.save().then((batchsubstudent) => {
        res.send(batchsubstudent)
      })

    })
  })


})

module.exports = router
