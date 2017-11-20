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

  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date

})

StudentSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['name','email','_id','contact'])
}





StudentSchema.methods.generateAuthToken = function () {
  var student = this;
  var access = 'auth'

  var token = jwt.sign({_id: student._id.toHexString(), access},'abc123').toString();
  student.tokens.push({
    access: access,
    token: token
  })
  return student.save().then(() => {
    return token
  })
}

StudentSchema.pre('save', function(next){
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


StudentSchema.statics.findByCredentials = function (username,password){
  var Student = this;
  return Student.findOne({username:username}).then((student) => {
    if(!student){ return Promise.reject()}

    return new Promise((resolve,reject) => {
      bcrypt.compare(password,student.password,(err, res) => {
        if(res){
          resolve(student)
        }else {reject()}
      })
    })
  })
}



























var Student = mongoose.model('Student', StudentSchema)

module.exports = {
  Student
}
