var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// token验证，跳过login路由
app.use((req, res, next) => {
  if (req.url.includes('login')) {
    next()
    return
  }
  const token = req.headers["authorization"]?.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 重新计算token时间
      const newToken=JWT.generate({
        _id:payload._id,
        username:payload.username
      },'1d')
      res.header('Authorization',newToken)
      next()
    } else {
      res.status(401).send({
        errorCode: -1,
        tokenInfor: "token过期"
      })
    }
  } else {
    next()
  }
})




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
