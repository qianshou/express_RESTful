/**
 * Created by hzzhaozhe1 on 2017/5/15.
 */

let UserModel = {};

UserModel.init = (users=[])=>{
    this.users = users;
};

UserModel.add = (user)=>{
    this.users.push(user);
};

UserModel.list = ()=>{
    return this.users;
}


module.exports = UserModel;