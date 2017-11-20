const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {Student} = require('../modeles/student.js')
var {mongoose} = require('../db/mongoose.js');


//Student-login
router.post('/', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);
  //Model method
  Student.findByCredentials(body.username, body.password).then((student) => {
    return student.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(student);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

module.exports = router
