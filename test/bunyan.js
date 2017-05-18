/**
 * Created by zhezhao on 2017/5/17.
 */
let bunyan = require('bunyan');
const config = require('../util/config');
const path = require('path');

// var log = bunyan.createLogger({
//     name:"myapp",
//     streams:[{
//             level:'info',
//             stream:path.join(config.BASE_DIR,'log','info.log')
//         },
//         {
//             level:'error',
//             stream:path.join(config.BASE_DIR,'log','error.log')
//         }
//     ]
// });