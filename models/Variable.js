const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariableSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  dailylogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DailyLog'
    }
  ]
}, {
  timestamps: true
});

module.exports = Variable = mongoose.model("Variable", VariableSchema);