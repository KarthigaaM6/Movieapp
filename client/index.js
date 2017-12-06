let Cookies = require('universal-cookie');

let isLoggedIn = function () {
 const cookies = new Cookies();
 const username = cookies.get('username');
 if(username) {
   console.log('User alreadyLoggedIn ( username: ' + username + ' ).');
   return true;
 } else {
   console.log('New User.');
   return false;
 }
};

module.exports = {
 isLoggedIn: isLoggedIn
};