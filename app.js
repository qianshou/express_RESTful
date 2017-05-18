var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var config = require('./util/config');
var logger = require('./util/logger');
var routes = require('./routes');
var app = express();

//morgan请求日志处理模块
var accessLogStream = fs.createWriteStream(path.join(config.LOG_PATH,'access.log'));
morgan.format('app',':method :url :status :remote-addr');
if(config.DEBUG != "production"){
    app.use(morgan('app'));
}
app.use(morgan('app', {stream: accessLogStream}));

//加载express中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,   // 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new FileStore
}));

//加载路由文件
routes(app);

// error handler
app.use(function(err, req, res, next) {
  let ret = {};
  ret.message = err.message;
  ret.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  logger.error(ret);
  if(config.DEBUG != "production"){
      res.send(ret);
  }else{
      res.send('internal error');
  }
});

module.exports = app;
