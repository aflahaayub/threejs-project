const express = require('express')
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authMedia', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('CONNECTION OPEN!');
  })
  .catch(err =>{
    console.log('ERROR');
    console.log(err);
  });

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(__dirname + '/src'));
app.use(express.urlencoded({extended: true}))
app.use(session({secret: 'notagoodsecret'}))

const requireLogin = (req,res,next)=>{ //set middleware
  if(!req.session.user_id){
    return res.redirect('/account')
  }
  next();
}

app.get('/account', async(req, res)=>{
  res.render('account')
})

app.post('/account', async(req,res)=>{
  if('signup' === req.body.formType){
    console.log(req.body)
    const {password, username} = req.body;
    if(username === '' || password === ''){
      res.redirect('/account')
    }else{
      const user = new User({username,password})
      await user.save();
      req.session.user_id = user._id;
      res.redirect('/secret')
    }
  }else if('signin' === req.body.formType){
    const {password, username} = req.body;
    const user = await User.findOne({username});
    const foundUser = await User.findAndValidate(username, password)
    if(user){
      if(foundUser){
        req.session.user_id = user._id;
        res.redirect("/secret")
      }else{
        res.redirect('/account')
      }
    }else{
      res.redirect('/account')
    }
  }
})


// app.get('/', (req,res)=>{
//   res.send('THIS IS THE HOME PAGE')
// })

// app.get('/register', (req,res)=>{
//   res.render('auth')
// })

// app.post('/register', async(req,res)=>{
//   // res.send(req.body)
//   const {password, username} = req.body;
//   // const hash = await bcrypt.hash(password, 12)
//   const user = new User({
//     username,
//     // password: hash
//     password
//   })
//   await user.save();
//   req.session.user_id = user._id;
//   res.redirect('/')
// })

// app.get('/login', (req,res)=>{
//   res.render('login')
// })

// app.post('/login', async(req,res, err)=>{
//   // res.send(req.body)
//   const {username, password} = req.body;
//   const user = await User.findOne({username});
//   const foundUser = await User.findAndValidate(username, password)
//   // const validPassword = await bcrypt.compare(password, user.password)
//   if(user){
//     if(foundUser){
//       req.session.user_id = user._id;
//       res.redirect("/secret")
//     }else{
//       res.redirect('/login')
//     }
//   }else{
//     res.redirect('/login')
//   }
// })

app.post('/logout', (req,res)=>{
  // req.session.user_id = null; //choice 1
  req.session.destroy(); //choice 2, destroy everything
  res.redirect('/account')
})

app.get('/secret', requireLogin, (req,res)=>{
  if(!req.session.user_id){
    return res.redirect('/account')
  }
  res.render('secret')
})

app.get('/topsecret', requireLogin, (req,res)=>{
  res.send('TOP SECRET PAGE!')
})


app.listen(3000, ()=>{
  console.log('serving app...')
})