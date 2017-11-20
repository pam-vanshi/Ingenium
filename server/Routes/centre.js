const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {mongoose} = require('../db/mongoose.js');
var {Centre} = require('../modeles/centre.js')

router.post('/',(req,res) => {
  var body = _.pick(req.body, ['name','email','address','contact'])
  var centre = new Centre(body);

  centre.save().then((centre) => {
    res.send(centre)
  });
})

module.exports = router
