const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  username: {
    type: String
  },
  quizOneScore:{
    type: Number
  },
  quizTwoScore:{
    type: Number
  },
  quizThreeScore:{
    type: Number
  },
  evaluationScore:{
    type: Number
  },
  totalScore:{
    type: Number
  }
});

module.exports = mongoose.model('HistoryUser', HistorySchema);