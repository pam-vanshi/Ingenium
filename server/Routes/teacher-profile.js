var express = require('express');
var router = express.Router();
var {Teacher} = require('../modeles/teacher.js')
var {mongoose} = require('../db/mongoose.js');
var {authenticate} = require('../middleware/authenticate');

//teacher-profile-after-login
router.get('/',authenticate, (req,res) => {
  //var id = req.params.id;
  res.send(req.user);
})

module.exports = router
