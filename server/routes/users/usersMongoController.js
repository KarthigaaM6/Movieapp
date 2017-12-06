var mongoose = require('mongoose');
var UserModel = require('../../models/user');

/* Adding user details to the database */
var saveUser = function(newUser, errorFun, successFun) {
    var NewUser = new UserModel(newUser);
    NewUser.save(function(err, data) {
        if (err) {
            errorFun(err);
        } else {
            successFun(data);
        }
    });
};

/* Retrieving userdetails from database */
var getUser = function(user, errorFun, successFun) {
    UserModel.findOne({
        username: user.username,
        password: user.password
    }, function(err, data) {
        if (err) {
            errorFun(err);
        } else {
            successFun(data);
        }
    });
};

module.exports = {
    saveUser: saveUser,
    getUser: getUser
};