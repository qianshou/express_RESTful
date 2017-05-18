/**
 * Created by hzzhaozhe1 on 2017/5/15.
 */

const UserModel = require('../model/UserModel');

let UserController = {};

UserController.list = (req,res)=>{
    UserModel.init(['zhezhao','naruto']);
    res.send(UserModel.list());
};

module.exports = UserController;