const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const session = require('express-session');
const config = require('./bundler/webpack.dev.js')
const compiler = webpack(config)
const db = require('./backend/config/db')
const indexRouter = require('./backend/routes/index')
const usersRouter = require('./backend/routes/users')

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json());
app.use(express.static(__dirname + '/src'));
app.use(express.urlencoded({extended: true}))
app.use(session({secret: 'notagoodsecret'}))

//CALL ROUTE
app.use('/', indexRouter);
app.use(usersRouter)

// ERROR 404
app.use((req, res, next)=>{
  res.status(404).send('Resource is not found!');
});

//middleware error 500
const errorHandling = (err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan / internal server error')
};

app.use(errorHandling);


app.listen(43650, ()=>{
  console.log('serving app...')
})
