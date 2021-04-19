const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  variables: [{
    varId: {
      type: Schema.Types.ObjectId,
      ref: 'Variable'
    },
    count: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = DailyLog = mongoose.model("DailyLog", DailyLogSchema);