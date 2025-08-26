const express = require("express");
const isLoggedin = require("../middleware/isLoggedin");
const producrModel = require("../models/producrModel");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/",(req ,res)=> {
    let error = req.flash("error");
    res.render("index", {error, loggedin: false})
 });

router.get("/shop", isLoggedin, async(req, res)=> {
  let products =   await producrModel.find();
  let success = req.flash("success")
    res.render("shop" , {products , success})
})

router.get("/cart", isLoggedin, async(req, res)=> {

let user = await userModel.findOne({email: req.user.email}).populate("cart");
console.log(user)
res.render("cart", {user})

})



router.get("/addToCart/:id", isLoggedin, async(req , res)=> {

  //first we will find the user
let user = await userModel.findOne({email: req.user.email});


//have our cart array in model push that itme in that array
user.cart.push(req.params.id);
await user.save()
req.flash("success", "Added To Cart");
res.redirect("/cart")
 // then have increment and decrement functionality
})

router.get("/logout", isLoggedin, (req, res)=> {
    res.render("shop")
})

 


module.exports = router;