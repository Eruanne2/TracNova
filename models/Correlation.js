const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorrelationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  variables: [
    {
      type: Schema.Types.ObjectId,
      ref: "Variable"
    }
  ]
}, {
  timestamps: true
});

module.exports = Correlation = mongoose.model("Correlation", CorrelationSchema);