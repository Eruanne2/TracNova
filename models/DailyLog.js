const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  variables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Variable'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = DailyLog = mongoose.model("DailyLog", DailyLogSchema);