const express = require("express");
//const {  read, create } = require("../controllers/packController");
const router = express.Router();
const {getPackages, createPackages, updateackages, deletePackages} = require('../controllers/packageController')
// router.post("/create", create);
// router.get("/read/all", read);
// router.put("/update", update);
// router.delete("/delete", deleteRec);


router.route('/').get(getPackages).post(createPackages)
router.route('/:id').put(updateackages).delete(deletePackages)


module.exports = router;