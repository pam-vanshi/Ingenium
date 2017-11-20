const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {Centre} = require('../modeles/centre.js')
var {Batch} = require('../modeles/batch.js')
var {Class} = require('../modeles/class.js')


router.post('/',(req,res) => {
  var body = _.pick(req.body, ['centre','class','section'])
  var batch = new Batch();
  batch.section = body.section;
  Class.findOne({class:body.class}).then((class1) => {
     batch.class.push(class1)
  })

  Centre.findOne({name:body.centre}).then((centre) => {


      batch.coaching.push(centre);

      return batch.save()

  }).then((batch) => {
    res.send(batch)
  })

  })

module.exports = router
