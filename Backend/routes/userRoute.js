const express = require("express");
const router = express.Router();


const {
    updatePackages, createUser, getFavoritesByUser
  } = require("../controllers/userController");


  router.route("/:userId").put(updatePackages).get(getFavoritesByUser)
  router.route('/create').post(createUser)
//   router.post("/create",  createUser);



  module.exports = router;