var express = require('express');
var router = express.Router();
var controller = require('./usersMongoController');

module.exports = function(passport){

  /* login success route */
  router.get('/loginsuccess', function(req, res) {
    try {
      res.status(200).json({status: 'login success'});
    } catch(e) {
      console.log('error in login success route: ', e)
    }
  });

  /* login failure route */
  router.get('/loginfailed', function(req, res) {
    try {
      res.status(200).json({status: 'login failed'});
    } catch(e) {
      console.log('error in login failed route: ', e)
    }
  });
 router.get('/signupsuccess', function(req, res) {
    try {
      res.status(200).json({status: 'signup success'});
    } catch(e) {
      console.log('error in signup success route: ', e)
    }
  });
  router.get('/signupfailed', function(req, res) {
    try {
      res.status(200).json({status: 'username already exsist'});
    } catch(e) {
      console.log('error in signup failed route: ', e)
    }
  });
  /* signup action */
  router.post('/signup', passport.authenticate('signup',{
      successRedirect:'/users/signupsuccess',
      failureRedirect:'/users/signupfailed'
  }));


  /* login action */
  router.post('/login', passport.authenticate('login',{
      successRedirect:'/users/loginsuccess',
      failureRedirect:'/users/loginfailed'
  }));

  /* logout action */
  router.get('/logout', function(req,res){
      req.session.destroy(function(err) {
          if (err) {
            console.log("Error");
          } else {
            res.json({status:'success'});
          }
        });
  });
  return router;
}
