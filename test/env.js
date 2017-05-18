/**
 * Created by zhezhao on 2017/5/15.
 */

const config = require('../util/config');
const path = require('path');

var logDirectory = path.join(__dirname,config.access_log_path);

console.log(logDirectory)