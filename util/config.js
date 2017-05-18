/**
 * Created by zhezhao on 2017/5/16.
 */

const fs = require('fs');
const path = require('path');

let name = '';
if(typeof process.env.ENV == "undefined"){
    name = 'default';
}else{
    let env = process.env.ENV;
    if(fs.existsSync('../config/'+env+'.json')){
        name = env;
    }else{
        name = 'default';
    }
}
//静态配置

const config = require('../config/'+name+'.json');

//动态配置

config.BASE_DIR = path.resolve(__dirname,'..');
config.LOG_PATH = path.join(config.BASE_DIR,config.logPath);
module.exports = config;