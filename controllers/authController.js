const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generatedToken } = require("../utils/generatedToken");
const cookie = require("cookie-parser");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, psw } = req.body;

    //finding if the user exists
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("You alread have an account");

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

    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};
