const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')




var CentreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    default: null,
    trim: true
  },
  address: {
    type: String,
    minlength: 10,
    default: null,
    trim: true

  },
  contact: {
    type: String,
    required: true,
    minlength: 10,
    default: null,
    trim: true

  },


})

var Centre = mongoose.model('Centre', CentreSchema)

module.exports = {
  Centre
}
