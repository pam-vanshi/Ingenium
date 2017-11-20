const _ = require('lodash')
var express = require('express');
var router = express.Router();
var {Fee} = require('../modeles/fees.js')
var {Student} = require('../modeles/student.js')
var {mongoose} = require('../db/mongoose.js');


router.post('/',(req,res) => {
  var body = _.pick(req.body, ['student','paid'])
  var fee = new Fee(); // isko moment use karke karna hai
  var MonthYear = ['January','February','March','April','May','June','July','August','September','October','November','December']
  var month = new Date().getMonth()//It returns the index number
  fee.monthyear= MonthYear[month]
  fee.paid = body.paid
  Student.findOne({name: body.student}).then((student) => {
    if(!student){
      return Promise.reject()
    }
    fee.student.push(student);
  fee.save().then((fee) => {
    console.log(fee.month);
    res.send(fee)
  }).catch((e) => {
    re.send(e)
  })
})
})

module.exports = router
