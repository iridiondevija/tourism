const express = require("express");
const router = express.Router();
const {
  getAgent,
  loginAgent,
  registerAgent,
  getAllPackages,
} = require("../controllers/agentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerAgent);
router.post("/login", loginAgent);
router.get("/me", protect, getAgent);
router.get("/get",  getAllPackages);


module.exports = router;