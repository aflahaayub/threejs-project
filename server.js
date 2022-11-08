const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./bundler/webpack.dev.js')
const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

const User = require('./models/user');
const History = require('./models/user_history')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session');
const ObjectId = require('mongodb').ObjectId;


mongoose.connect('mongodb://localhost:27017/mediaDatabase', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('CONNECTION OPEN!');
  })
  .catch(err =>{
    console.log('ERROR');
    console.log(err);
  });

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json());
app.use(express.static(__dirname + '/src'));
app.use(express.urlencoded({extended: true}))
app.use(session({secret: 'notagoodsecret'}))

const requireLogin = (req,res,next)=>{ //set middleware
  if(!req.session.user_id){
    return res.redirect('/account')
  }
  next();
}

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.get('/', (req,res)=>{
  res.redirect('/index.html')
})

app.get('/home', (req,res)=>{
  res.redirect('/home')
})

app.get('/account', async(req, res)=>{
  res.render('account')
})

app.post('/account', async(req,res)=>{
  if('signup' === req.body.formType){
    const {password, username} = req.body;
    if(username === '' || password === ''){
      res.redirect('/account')
    }else{
      const user = new User({username,password})
      await user.save().then().catch(err=>console.log(err))

      const historyUser = new History({username, quizOneScore: 0, quizTwoScore: 0, quizThreeScore: 0, evaluationScore: 0, totalScore: 0 })
      await historyUser.save().then().catch(err=>console.log(err))

      req.session.user_id = user._id;
      req.session.username = user.username;
      res.redirect('/home.html')
    }
  }else if('signin' === req.body.formType){
    const {password, username} = req.body;
    const user = await User.findOne({username});
    const foundUser = await User.findAndValidate(username, password)
    if(user){
      if(foundUser){
        req.session.user_id = user._id;
        req.session.username = user.username;
        res.redirect("/home.html" )
      }else{
        res.redirect('/account')
      }
    }else{
      res.redirect('/account')
    }
  }
})

app.get('/quizOne',requireLogin, (req,res)=>{
  const username = req.session.username;
  // res.send(req.params)
  console.log(req.params)
   res.render('quizOne', {username})
})

app.post('/quizOne', (req,res)=>{
  const {quizScore, username} = req.body;
  console.log(req.body)
  History.updateOne({username}, {$set: {quizOneScore: quizScore}}, (err)=>{
    if(err){
      console.log(err)
    }
  })
})

app.get('/quizTwo', requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('quizTwo', {username})
})

app.post('/quizTwo', (req,res)=>{
  const {quizScore, username} = req.body;
  console.log(req.body)
  History.updateOne({username}, {$set: {quizTwoScore: quizScore}}, (err)=>{
    if(err){
      console.log(err)
    }
  })
})

app.get('/quizThree',requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('quizThree', {username})
})

app.post('/quizThree', (req,res)=>{
  const {quizScore, username} = req.body;
  console.log(req.body)
  History.updateOne({username}, {$set: {quizThreeScore: quizScore}}, (err)=>{
    if(err){
      console.log(err)
    }
  })
})

app.get('/evaluasi',requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('evaluasi', {username})
})

app.post('/evaluasi', (req,res)=>{
  const {quizScore, username} = req.body;
  console.log(req.body)
  History.updateOne({username}, {$set: {evaluationScore: quizScore}}, (err)=>{
    if(err){
      console.log(err)
    }
  })
})

app.get('/leaderboard', requireLogin,async(req,res)=>{
  const username = req.session.username;
  let userHistory = [];
  const user = await History.where({username});

  const usersHistory = await History.find({});
  const arrUsers = []
  for(let user of usersHistory){
    arrUsers.push({
      username: user.username,
      quizOneScore: user.quizOneScore,
      quizTwoScore: user.quizTwoScore,
      quizThreeScore: user.quizThreeScore,
      evaluationScore: user.evaluationScore,
      totalScore: user.quizOneScore + user.quizTwoScore + user.quizThreeScore+user.evaluationScore
    })
  }

  const users = arrUsers
  users.sort((a,b)=> b.totalScore -a.totalScore)

  res.render('history', {users,user,username})
  
})

app.get('/materi', requireLogin, async(req,res)=>{
  res.render('materi')
})

app.listen(3000, ()=>{
  console.log('serving app...')
})