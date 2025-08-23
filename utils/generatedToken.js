
// so we will be getting the user for right like 
// there will be different users.. and everyone have different user id
// therfore we will make this token reusalbe by passing the user in it ..


const jwt = require("jsonwebtoken");


const generatedToken = (user) => {
return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
            expiresIn: "1h",
          });
}


module.exports.generatedToken = generatedToken;

 