const express = require("express");
const router = express.Router();

const {
  createPackage,
  readPackage
} = require("../controllers/packageController");

router.post("/create", createPackage);
router.get("/read", readPackage);

module.exports = router;
