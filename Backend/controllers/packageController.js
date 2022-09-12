const admin = require("firebase-admin");

const db = admin.firestore();

// @desc    Create a package
// @route   POST /api/users/login
// @access  Public
const createPackage = async (req, res) => {
  try {
    const userJson = {
      description:req.body.description,
      image: req.body.image,
      images: req.body.images,
      location: req.body.location,
      price: req.body.price,
      title: req.body.title,
      rating: req.body.rating,
    };
    const response = await db.collection("cards").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

// @desc    Get packages data
// @route   GET /api/packages/read
// @access  Private
const readPackage = async (req, res) => {
  try {
    const usersRef = await db.collection("cards");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push({
        elements: doc.data(),
        elementId: doc.id
      });
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { createPackage, readPackage };
