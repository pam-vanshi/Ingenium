const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var TeacherSchema = new mongoose.Schema({
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
    required: true,
    isAsync: true,
    validate: {
      isAsync:false,
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }

  },tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type:String,
      required: true
    }
  }],
  password: {
        type: String,
        required: true,
        minlength: 6
  }

})

TeacherSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['name','email','_id','contact'])
}
TeacherSchema.methods.generateAuthToken = function() {
  var teacher= this;
  var access = 'auth';

  var token = jwt.sign({_id: teacher._id.toHexString(), access},'abc123').toString();
  teacher.tokens.push({
    access: access,
    token: token
  })
  return teacher.save().then(() => {
    return token
  })
}

TeacherSchema.statics.findByToken = function(token) {
  var Teacher = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return Teacher.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

TeacherSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt, (err,hash) => {
           user.password = hash;
             next()
      })
    })

  }else {
    next()
  }

})

TeacherSchema.statics.findByCredentials = function (email,password){
  var Teacher = this;
  return Teacher.findOne({email:email}).then((user) => {
    if(!user){ return Promise.reject()}

    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err, res) => {
        if(res){
          resolve(user)
        }else {reject()}
      })
    })
  })
}

var Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = {
  Teacher
}
