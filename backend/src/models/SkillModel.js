const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "name is required "]

    },
   proficiency: {
    type: String,
    required: [true, "proficiency is required"]
  },

  category: {
    type: String,
    required: [true, "category is required"]
  },

  icon: {
    type: String,
    required: [true, "icon is required"]
  }
}, {
    timestamps: true
})

const SkillsModel = mongoose.model('Skills', SkillsSchema)

module.exports = SkillsModel