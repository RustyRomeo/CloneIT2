//***********************************************
// THE PASSWORD SERVICE
//***********************************************

var passwordHash = require('password-hash');

pw = {};

pw.generateHash = function (pw){
    console.log('PASSWORD TOO!', pw);
    var hashedPassword = passwordHash.generate(pw);
    return hashedPassword;
};

pw.verifyHash = function (pw, hash){
    console.log('Bin am Verifien');
    return passwordHash.verify(pw, hash);

};

console.log('Mish Hashed: ', pw.generateHash('mish'));

var mishPw = pw.generateHash('mish');
console.log('mishPW: ', mishPw);
var istrue = pw.verifyHash('mish', mishPw);
console.log(istrue);
