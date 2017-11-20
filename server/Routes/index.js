var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('this is something else');
    console.log('somethng is runniing atleast');
    res.send("ye to work kar raha hai")
});

module.exports = router;
