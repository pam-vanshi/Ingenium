const express = require('express')
const bodyParser = require('body-parser')
var {mongoose} = require('./db/mongoose.js');
const _ = require('lodash')
var {Teacher} = require('./modeles/teacher.js')
var {authenticate} = require('./middleware/authenticate');
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json())

app.listen(port, console.log(`Server is running on ${port}`))



app.post('/teacher',(req,res) => {
  var body = _.pick(req.body, ['name','email','password','contact'])
  var teacher = new Teacher(body);

  teacher.save().then((teacher) => {
    return teacher.generateAuthToken()
  }).then((token) => {
    res.header('x-auth',token).send(teacher)
  }).catch((e) => {
    res.status(400).send(e);
  })


})

app.get('/teacher/me',authenticate, (req,res) => {
  res.send(req.user);
})

app.post('/teacher/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  Teacher.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});