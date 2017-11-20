
const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {Teacher} = require('../modeles/teacher.js')
var {mongoose} = require('../db/mongoose.js');


router.post('/',(req,res) => {
  var body = _.pick(req.body, ['name','email','password','contact','username'])
  var teacher = new Teacher(body);

  teacher.save().then((teacher) => {
    return teacher.generateAuthToken()
  }).then((token) => {
    res.header('x-auth',token).send(teacher)
  }).catch((e) => {
    res.status(400).send(e);
  })



})
router.get('/', (req,res) => {
  Teacher.find().then((teacher) => {
    res.send(teacher)
    console.log("bhej di request");
  }, (e) => {
    res.status(400).send(e);
  })
})




module.exports = router
