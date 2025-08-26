const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig")
const productModel = require("../models/producrModel")

router.post("/create", upload.single("image"), async function(req ,res) {
try {
       let { name , price , discount , bgcolor, panelcolor, textcolor} = req.body;
    let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    textcolor,
    panelcolor
 });
 
 req.flash("success", "Product created Successfully")
 res.redirect("/shop")

} catch (error) {
    res.send(err.message);
}
 

})

module.exports = router;