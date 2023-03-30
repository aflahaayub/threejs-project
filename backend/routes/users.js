const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const History = require('../models/HistorySchema');
const app = express();

app.use(express.json())
app.use(express.urlencoded())

const requireLogin = (req,res,next)=>{ //set middleware
  if(!req.session.user_id){
    return res.redirect('/account')
  }
  next();
}

//GET DATA
router.get('/account', (req, res)=>{
  let alert =''
  res.render('account', alert)
})

router.get('/home', requireLogin, (req,res)=>{
  res.redirect('/home.html')
})

router.get('/quizOne',requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('quizOne', {username})
})

router.get('/quizTwo', requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('quizTwo', {username})
})

router.get('/quizThree',requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('quizThree', {username})
})

router.get('/evaluasi',requireLogin, (req,res)=>{
  const username = req.session.username;
   res.render('evaluasi', {username})
})

router.get('/remedial', requireLogin, async(req,res)=>{
  const username = req.session.username;
  const user = await History.where({username});
  res.render('remedial', {user,username})
})

router.get('/leaderboard', requireLogin,async(req,res)=>{
  const username = req.session.username;
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

router.get('/materi', requireLogin, async(req,res)=>{
  const username = req.session.username;
  const user = await History.where({username});
  res.render('materi', {user})
})

//POST DATA
router.post('/account', async(req,res)=>{
  let alert = ''
  if('signup' === req.body.formType){
    const {password, username} = req.body;

    if(username === '' || password === ''){
      res.redirect('/account', {alert: 'Silahkan isi username atau password dengan benar!'})
    }else{
      const userFind = await User.findOne({username});
      if(userFind){
        res.redirect('/account', {alert: 'Username sudah terdaftar, silahkan gunakan username lain!'})
      }else{
      const user = new User({username,password})
      await user.save().then().catch(err=>console.error(err))

      const historyUser = new History({username, quizOneScore: 0, quizTwoScore: 0, quizThreeScore: 0, evaluationScore: 0, totalScore: 0 })
      await historyUser.save().then().catch(err=>console.error(err))

      req.session.user_id = user._id;
      req.session.username = user.username;
      res.redirect('/home.html')
      }
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
        res.redirect('/account', {alert: 'Username atau password salah, silahkan isi kembali!'})
      }
    }else{
      res.redirect('/account', {alert: 'Username belum pernah terdaftar!'})
    }
  }
})

router.post('/quizOne', (req,res)=>{
  const {quizScore, username} = req.body;
  History.updateOne({username}, {$set: {quizOneScore: quizScore}}, (err)=>{
    if(err){
      console.error(err)
    }
  })
})

router.post('/quizTwo', (req,res)=>{
  const {quizScore, username} = req.body;
  History.updateOne({username}, {$set: {quizTwoScore: quizScore}}, (err)=>{
    if(err){
      console.error(err)
    }
  })
})

router.post('/quizThree', (req,res)=>{
  const {quizScore, username} = req.body;
  History.updateOne({username}, {$set: {quizThreeScore: quizScore}}, (err)=>{
    if(err){
      console.error(err)
    }
  })
})

router.post('/evaluasi', (req,res)=>{
  const {quizScore, username} = req.body;
  History.updateOne({username}, {$set: {evaluationScore: quizScore}}, (err)=>{
    if(err){
      console.error(err)
    }
  })
})

module.exports = router