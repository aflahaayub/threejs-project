const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
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

module.exports = mongoose.model('HistoryUser', historySchema);