const mongoose = require('mongoose');


var NotificationSchema = new mongoose.Schema({
  createdAt: {
    type: String

  } ,
  batchsub : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BatchSubStudent'
  }],
  text: {
    type: String
  }

})



var Notifications = mongoose.model('Notification',NotificationSchema)

module.exports = {
  Notifications}
