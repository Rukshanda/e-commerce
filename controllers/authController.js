const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generatedToken } = require("../utils/generatedToken");
const cookie = require("cookie-parser");


//REGISTER USER
module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, psw } = req.body;

    //finding if the user exists
    let user = await userModel.findOne({ email: email });
    if (user) {
          req.flash("error", "You already have an account please login");
    return res.redirect("/")
    }

    // bcrypt the psw
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(psw, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            psw: hash,
          });

          let token = generatedToken(user);
          res.cookie("token", token);
          res.send("User Creatd Succesfully");
        }
      });
    });

  } catch (error) {
    console.log(error.message);
  }
};


//LOGIN USER
module.exports.loginUser = async (req , res) => {
  let {email , psw } = req.body;
  let user = await userModel.findOne({email: email});
  if(!user){
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/")
  }
  
  bcrypt.compare(psw, user.psw, function(err ,result){
    if(result){
     let token =  generatedToken(user);
     res.cookie("token", token);
     res.redirect("/shop")
    } else{
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/")    }
  })
}


// LOGOUT
module.exports.logout = function(req ,res){
  res.cookie("token", "");
  res.redirect("/")
}