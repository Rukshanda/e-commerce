const mongoose = require("mongoose");

 
const userSchema = mongoose.Schema({
    fullname : String,
    email: String,
    psw: String,
    cart : [{
        type: mongoose.Schema.Types.ObjectId,
       ref: "product"
    }],
    orders: {
        type: Array,
        default:[]
    },
    contact: Number,
    picture: String
})

module.exports = mongoose.model("user" , userSchema)