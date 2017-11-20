const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {TeacherBatchSubBatch} = require('../modeles/teacher-batch-sub.js')
var {BatchSub} = require('../modeles/batch-sub.js')
var {Teacher} = require('../modeles/teacher.js')



router.post('/',(req,res) => {
  var body = _.pick(req.body, ['batchsubid', 'teacherid'])
  var teacherbatchSub = new TeacherBatchSub();
  Teacher.findById(body.teacherid).then((teacher) => {
    teacherbatchSub.teacher.push(teacher)
   })
  BatchSub.findById(body.batchsubid).then((batchsub) => {
    teacherbatchSub.batchsub.push(batchsub)
    teacherbatchSub.save().then((teacherbatchSub) => {
      res.send(teacherbatchSub)
    })
  })

  })

  module.exports = router
