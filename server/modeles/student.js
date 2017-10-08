const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
var StudentSchema = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 1,
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
  email: {
    type: String,
    trim: true,
    minlength: 5,
    unique: true,
    //required: true,
    isAsync: true,
    validate: {
      isAsync:false,
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }

  },
  username: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
    unique: true
  },
  tokens: [{
    access: {
      type: String,
      //required: true
    },
    token: {
      type:String,
      //required: true
    }
  }],
  password: {
        type: String,
        required: true,
        minlength: 6
  },
  coaching: [{
    type: Schema.Types.ObjectId,
    ref: 'Centre'
    //$id:

  }]

})

var Student = mongoose.model('Student', StudentSchema)

module.exports = {
  Student
}
