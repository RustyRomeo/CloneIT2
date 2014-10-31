//***********************************************
// THE PASSWORD SERVICE
//***********************************************

var passwordHash = require('password-hash');

pw = {};

pw.generateHash = function (pw){
    return passwordHash.generate(pw);
};

pw.verifyHash = function (pw, hash){
    return passwordHash.verify(pw, hash);
};
