var {Teacher} = require('./../modeles/teacher.js');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  Teacher.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
