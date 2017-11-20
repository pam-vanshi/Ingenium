const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {Student} = require('../modeles/student.js')
var {mongoose} = require('../db/mongoose.js');
var {Centre} = require('../modeles/centre.js')
//Student signup
router.post('/',(req,res) => {
  var body = _.pick(req.body, ['name','email','password','contact','username','centre'])
  var student = new Student(body);
  Centre.findOne({name:body.centre}).then((centre) => {
    student.coaching.push(centre);
    student.save().then((student) => {
      return student.generateAuthToken()
    }).then((token) => {
      res.header('x-auth', token).send(student);
    });

  }).catch((e) => {
    res.send(e);
  })
  //student.coaching.push(centre);
})

module.exports = router
