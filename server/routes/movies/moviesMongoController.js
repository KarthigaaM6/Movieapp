var mongoose = require('mongoose');
var MovieModel = require('../../models/movie');

/* Saving the movielist to the database */
var getMovie = function(newMovie, errorFun, successFun) {
   MovieModel.find({title:newMovie.title}, function(err1,data1){
       if(err1){
            errorFun(err1);
       }else{
           if(data1.length == 0){
               // saving a new movie
               var Movie = new MovieModel(newMovie);
               Movie.save(function(err2, data2){
                   if(err2){
                       errorFun(err2);
                   } else {
                       console.log('save Fav: ', data2);
                       successFun(data2);
                   }
               });
           }
           // If movie exsists already
           else{
           MovieModel.update({title:newMovie.title},{$push: {users:newMovie.users[0]}}, function(err3, data3){
               if(err3){
                   errorFun(err3);
               }
               else {
                   console.log('save Fav: ', data3);
                   successFun(data3);
               }
           });
       }

       }
   })
};

// Finding the favourite list in database
var getFav = function(username, errorFun, successFun) {
    MovieModel.find({users: username}, function(err, data) {
        if (err) {
            errorFun(err);
        } else {
            successFun(data);
        }
    });
};

// Deleting the favourite list using remove command
var deleteFav = function(movie, errorFun, successFun) {
    MovieModel.update(
    {title : movie.title},
    {$pull : {users: {$in: movie.users}}},
    function(err, data) {
        if (err) {
            errorFun(err);
        } else {
            successFun(data);
        }
    });
};

module.exports = {
    getMovie: getMovie,
    getFav: getFav,
    deleteFav: deleteFav
};
