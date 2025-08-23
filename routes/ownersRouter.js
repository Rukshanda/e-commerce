const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");




//it is just for the one to get..
router.get("/", (req, res) => {
  res.send("hey it's working");
});

// only allow creating owner in development environment
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    // creating the method post and in create router for owner
    try {
        // first finding all owners incase there are
      let owners = await ownerModel.find();
         // now if the length is greatar than 1.. then don't create the ownre and send an error
      if (owners.length > 0) {
        return res
          .status(504)
          .send("You don't have permission to create a new owner");
      }

      // gettting the fullname , emial and psw form the req.body
      let{fullname, email , psw} = req.body;

      // create a new owner (you should pass real data from req.body)
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        psw,
        
      });

      // the owner is created successfuly

      res.status(201).send(createdOwner);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
}



//exporting this router and using it in app.js where all the stuff will be displayed

module.exports = router;
