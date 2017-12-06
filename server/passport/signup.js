var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/user');

module.exports = function(passport){
    console.log('passport signup setting up...');
    passport.use('signup', new LocalStrategy({
        passReqToCallback:true
    },
    function(req, username, password, done){
        UserModel.findOne({'username':username},function(err,user){
            if(err){
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            // user already exsist
            if(user){
                console.log('username already exsists:' + username);
                return done(null,false);
            } else {
                var newUser = new UserModel();
                
                //set the user's credentials
                newUser.username = username;
                newUser.password = password;
                newUser.email = req.param('email');
                newUser.firstname = req.param('firstname');
                newUser.lastname = req.param('lastname');
                
                //saving into databases
                newUser.save(function(err){
                    if(err){
                        console.log('Error in saving user in the database: ' + err);
                        throw err;
                    }
                    console.log('New user registered succesfully');
                    return done(null, newUser);
                });
            }
            
        });
    })
    );
}