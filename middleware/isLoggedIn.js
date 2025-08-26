const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports= async function(req ,res , next)
{
    // chekcing if use has a token 
    // it is bascially like a pass to login
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect("/")
    }


    try {
        //verify the token with your secret key
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        
        let user = await userModel
        .findOne({email: decoded.email})
        .select("-psw");

        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Something went Wrong");
        res.redirect("/")
    }
}