var express = require('express');
var router = express.Router();
var {Teacher} = require('../modeles/teacher.js')
var {mongoose} = require('../db/mongoose.js');
var {authenticate} = require('../middleware/authenticate');

//teacher-logout
router.delete('/',authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
  })

  module.exports = router
