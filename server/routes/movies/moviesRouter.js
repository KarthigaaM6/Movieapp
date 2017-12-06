var express = require('express');
var router = express.Router();
var request = require('request');
var controller = require('./moviesMongoController');


var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if(req.isAuthenticated())
    return next();
    // if the user is not authenticated then redirect to the login page
        res.redirect('/users/loginpage');
};

module.exports = function(passport) {

    router.get('/', isAuthenticated, function(req, res) {
      try {
        res.status(200).sendFile(appRoot + '/server/public/html/movie.html');
      } catch(e) {
        console.log('error in redirecting to movie page: ', e)
      }
    });

    //Creating router for search
   /* router.get('/search', function(req, res) {
        try {
            request.get('https://api.themoviedb.org/3/search/movie?api_key=986b4a548b06fde5eed671f30ebe47db&language=en-US&query=' + req.query.moviename + '&page=1&include_adult=false', function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    var locals = JSON.parse(body);
                    res.send(locals);
                }
            });
        } catch (e) {
            console.log("internal server error in searching movie: ", e);
        }
    });*/

    //Creating router for addfavourites
    router.post('/add', function(req, res) {
        
        try {
            var users = [req.user.username];
            var moviedetails = {
                title: req.body.title,
                poster_path: req.body.poster_path,
                release_date: req.body.releasedate,
                users: users
            };
          
            controller.getMovie(moviedetails, function(err) {
                res.status(400).json({status:'error in saving new movie'});
            }, function(result) {
                res.status(200).json({status:'new movie saved successfully'});
                console.log("added succefully to db");
            });
        } catch (e) {
            console.log("internal server error in view favourites: ", e);

        }
    });

    //Creating router for display favourites
   router.get('/view', function(req, res) {
        try {
            var username = req.user.username;
            controller.getFav(username, function(err) {
                res.json({status:'error in displaying favourites'});
            }, function(result) {
                res.json(result);
            });
        } catch (e) {
            console.log("internal server error in displaying favourites: ", e);
        }
    });

    //Creating router for deleting the favourites
    router.post('/delete', function(req, res) {
        try {
            var del = {
                title : req.body.title,
                users : [req.user.username]
            };
            console.log('deleting movie: ' + req.body.title + ' -- ' + req.user.username)
            controller.deleteFav(del, function(err) {
                res.json({status:'error in deleting movie'});
            }, function(result) {
                console.log('deleted: ', result)
                res.json({status:'Deleted Successfully'});
            });
        } catch (e) {
            console.log("internal server error in deleting movie: ", e);
        }
    });

    return router;
 }
