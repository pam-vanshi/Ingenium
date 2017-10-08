const express = require('express')
const bodyParser = require('body-parser')
var {mongoose} = require('./db/mongoose.js');
const _ = require('lodash')
var {Teacher} = require('./modeles/teacher.js')
var {Student} = require('./modeles/student.js')
var {Centre} = require('./modeles/centre.js')
var {Subject} = require('./modeles/subject.js')
var {Class} = require('./modeles/class.js')
var {Batch} = require('./modeles/batch.js')
var {BatchSub} = require('./modeles/batch-sub.js')
var {TeacherBatchSub} = require('./modeles/teacher-batch-sub.js')
var {authenticate} = require('./middleware/authenticate');
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json())

app.listen(port, console.log(`Server is running on ${port}`))



app.post('/teacher',(req,res) => {
  var body = _.pick(req.body, ['name','email','password','contact','username'])
  var teacher = new Teacher(body);

  teacher.save().then((teacher) => {
    return teacher.generateAuthToken()
  }).then((token) => {
    res.header('x-auth',token).send(teacher)
  }).catch((e) => {
    res.status(400).send(e);
  })


})
app.get('/teacher', (req,res) => {
  Teacher.find().then((teacher) => {
    res.send(teacher)
    console.log("bhej di request");
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/teacher/me',authenticate, (req,res) => {
  res.send(req.user);
})

app.post('/teacher/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  Teacher.findByCredentials(body.username, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/teacherbatchsub',(req,res) => {
  var body = _.pick(req.body, ['batchsubid', 'teacherid'])
  var teacherbatchSub = new TeacherBatchSub();
  Teacher.findById(body.teacherid).then((teacher) => {
    teacherbatchSub.teacher.push(teacher)
   })
  BatchSub.findById(body.batchsubid).then((batchsub) => {
    teacherbatchSub.batchsub.push(batchsub)
    teacherbatchSub.save().then((teacherbatchSub) => {
      res.send(teacherbatchSub)
    })
  })

  })





app.post('/student',(req,res) => {
  var body = _.pick(req.body, ['name','email','password','contact','username','centre'])
  var student = new Student(body);
  Centre.findOne({name:body.centre}).then((centre) => {
    student.coaching.push(centre);
    student.save().then((student) => {
      res.send(student)
    });

  })
  //student.coaching.push(centre);



})

app.post('/centre',(req,res) => {
  var body = _.pick(req.body, ['name','email','address','contact'])
  var centre = new Centre(body);

  centre.save().then((centre) => {
    res.send(centre)
  });
})

app.post('/centre/batch',(req,res) => {
  var body = _.pick(req.body, ['centre','class','section'])
  var batch = new Batch();
  batch.section = body.section;
  Class.findOne({class:body.class}).then((class1) => {
    batch.class.push(class1)
  })

  Centre.findOne({name:body.centre}).then((centre) => {


      batch.coaching.push(centre);

      return batch.save()

  }).then((batch) => {
    res.send(batch)
  })

  })


  app.post('/centre/batch/batchsub',(req,res) => {
    var body = _.pick(req.body, ['subject', 'batchid'])
    var batchSub = new BatchSub();
    Subject.findOne({subject:body.subject}).then((subject1) => {
      batchSub.subject.push(subject1)
    })
    Batch.findById(body.batchid).then((batch1) => {
      batchSub.batch.push(batch1)
      batchSub.save().then((batchSub) => {
        res.send(batchSub)
      })
    })

    })






app.post('/subject',(req,res) => {
  var body = _.pick(req.body, ['subject'])
  var subject = new Subject(body);

  subject.save().then((subject) => {
    res.send(subject)
  });
})

app.post('/class',(req,res) => {
  var body = _.pick(req.body, ['class'])
  var subject = new Class(body);

  subject.save().then((subject) => {
    res.send(subject)
  });
})
