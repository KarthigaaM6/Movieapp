 var mongoose = require('mongoose');
 let Schema = mongoose.Schema({
    title :{
       type: String,
       unique: true
    } ,
    poster_path: String,
    release_date: String,
    users: [String]
});
let movie = mongoose.model("movie", Schema);
module.exports = movie;
