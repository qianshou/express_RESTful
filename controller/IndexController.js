/**
 * Created by hzzhaozhe1 on 2017/5/15.
 */
let IndexController = {};

IndexController.index = (req,res,next)=>{
    res.send('controller runs');
};

IndexController.about = (req,res,next)=>{
    res.send('about me ');
}


module.exports = IndexController;