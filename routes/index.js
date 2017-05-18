module.exports = (app)=>{

    //直接路由
    const IndexController = require('../controller/IndexController');
    app.use('/', function (req, res,next) {
        console.log('cross');
        next();
    });

    app.get('/set',function (req,res) {
        req.session.viewer = 1;
        res.send(req.session.viewer.toString());
    });
    app.get('/about',IndexController.about);

    //加载其他路由
    app.use('/users',require('./users'));

    //都没有找到，则抛出404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

};

