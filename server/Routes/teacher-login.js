const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {Teacher} = require('../modeles/teacher.js')
var {mongoose} = require('../db/mongoose.js');


router.post('/', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  Teacher.findByCredentials(body.username, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


module.exports = router
