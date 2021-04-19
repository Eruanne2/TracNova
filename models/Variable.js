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
  count: {
    type: Number,
    required: true
  },
  dailylogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DailyLog'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = Variable = mongoose.model("Variable", VariableSchema);