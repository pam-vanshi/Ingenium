const mongoose = require('mongoose')

var MacroSkillSchema = new mongoose.Schema({
  name: {
    type: String
  },
  chapter: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  }]
  })

var MacroSkill = mongoose.model('MacroSkill', MacroSkillSchema)

module.exports = {
  MacroSkill
}
