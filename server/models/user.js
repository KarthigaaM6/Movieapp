var mongoose = require('mongoose');
 let Schema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email:{
        type: String,
        unique: true
    },
    password: String
});
let user = mongoose.model("user", Schema);
module.exports = user;
