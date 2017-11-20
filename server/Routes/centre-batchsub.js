const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {Batch} = require('../modeles/batch.js')
var {BatchSub} = require('../modeles/batch-sub.js')
var {Subject} = require('../modeles/subject.js')



router.post('/',(req,res) => {
  var body = _.pick(req.body, ['subject', 'batchid'])
  var batchSub = new BatchSub();
  Subject.findOne({subject:body.subject}).then((subject1) => {
    batchSub.subject.push(subject1)
  })
  Batch.findById(body.batchid).then((batch1) => {
    batchSub.batch.push(batch1)
    batchSub.save().then((batchSub) => {
      res.send(batchSub)
    })
  })

  })

module.exports = router
