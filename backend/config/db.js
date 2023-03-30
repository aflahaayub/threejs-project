const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/penelitianMedia', {useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect('mongodb://aflahaayub:aflahaayub@%2Fhome%2Flearni14%2Fmongodb-0.sock/penelitianMedia?authSource=penelitianMedia', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('CONNECTION OPEN!');
  })
  .catch(err =>{
    console.log('ERROR');
    console.log(err);
  });

module.exports = mongoose