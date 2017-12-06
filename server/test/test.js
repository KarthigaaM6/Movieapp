var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('../index');
var moviecontrol = require('../routes/movies/moviesMongoController'); 
var authencontrol = require('../routes/users/usersMongoController');
var movie = require('../models/movie');
var authen = require('../models/user');
var url = request("http://localhost:3000");
var moviestub = sinon.stub(movie,'find');
var authenstub = sinon.stub(authen,'find');

//test case to find the user in database
describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        authenstub.withArgs({username:'karthi'}).returns({"password":"karthi"});
       });
       it('Matches the User',function(done){
           url       
           .post('/users/signup')  
           .expect(302)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(authenstub({username:'karthi'}).password).to.be.equal("karthi"); 
               done();
        });
  }); 
});

//test case to find the movie in favourite list related to user
describe('Finds the Title related to user in Database ',function(err){
        let dummy_release_date = new Date();
       beforeEach(function(){
        moviestub.withArgs({
                "title": "Ko",
                "poster_path": "dummy path",
                "release_date": dummy_release_date,
                "users": ["karthi"]
        }).returns({"status":"new movie saved successfully"});
       });
       it('Matches the Title by user',function(done){
           url       
           .post('/movies/add')  
           .expect(200)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(moviestub({
                    "title": "Ko",
                    "poster_path": "dummy path",
                    "release_date": dummy_release_date,
                    "users": ["karthi"]
                }).status).to.be.equal("new movie saved successfully"); 
               done();
       });
  }); 
});