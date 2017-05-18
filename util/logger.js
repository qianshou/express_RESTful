/**
 * Created by hzzhaozhe1 on 2017/5/17.
 */
'use strict'
const winston = require('winston');
const config = require('../util/config');
const path = require('path');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: path.join(config.LOG_PATH,'info.log'),
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: path.join(config.LOG_PATH,'error.log'),
            level: 'error'
        })
    ]
});

exports.error = (msg)=>{
    logger.error(msg);
}

exports.info = (msg)=>{
    logger.info(msg);
}

exports.req = (req)=>{
    logger.info({
        method: req.method,
        url: req.route.path,
        params: req.params
    });
}
