var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Ingenium',{
  useMongoClient : true
})


module.exports = {
  mongoose
}
