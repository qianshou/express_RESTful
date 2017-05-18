var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var FileStreamRotator = require('file-stream-rotator')
var config = require('./util/config');
var routes = require('./routes');
var app = express();

//morgan请求日志处理模块
var logDirectory = path.join(config.LOG_PATH,'access');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
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

//加载路由文件
routes(app);

// error handler
app.use(function(err, req, res, next) {
  let ret = {};
  ret.message = err.message;
  ret.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  if(config.DEBUG != "production"){
      res.send(ret);
  }else{
      res.send('internal error');
  }
});

module.exports = app;
