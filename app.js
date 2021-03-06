require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BootBot = require('bootbot');
const app = express();

let routes = require('./routes/global'); // đường dẫn cho trang web
let botRoutes = require('./bots/global'); // đường dẫn cho bots


// mongoose db
mongoose.connect('mongodb://fpt2018:fpt2018@ds014658.mlab.com:14658/quanganh9x', (error) => {
    if (error) console.log("Cant connect to MongoDB");
    else console.log("Connect successfully");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/// routes cho web ///
app.use('/', routes());
//////////////////////

////////////////// initialize our bots ////////////////////////
const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});
botRoutes(bot);
bot.start(6969); // triển thôi nhỉ :D
//////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
