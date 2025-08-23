const mongoose = require("mongoose");
const config = require("config")
const dbgr = require("debug")("development: mongoose");
                              //status      //coming files

mongoose
.connect(`${config.get("MONGODB_URI")}/e-commerce`)
.then(function(){
    dbgr("connected")
})
.catch(function(err){
    dbgr(err)
})

module.exports = mongoose.connection;