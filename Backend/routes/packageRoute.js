const express = require("express");
//const {  read, create } = require("../controllers/packController");
const router = express.Router();
const {getAllPackages, createPackages, updatePackages, deletePackages, getDetailPackage, getPackageDates} = require('../controllers/packageController')


// router.post("/create", create);
// router.get("/read/all", read);
// router.put("/update", update);
// router.delete("/delete", deleteRec);


router.route('/').get(getAllPackages).post(createPackages)
router.route('/:id').put(updatePackages).delete(deletePackages).get(getDetailPackage)
router.route('/:id/dates').get(getPackageDates)


module.exports = router;