const asyncHandler = require("express-async-handler");

const UserModel = require("../model/agentModel");

const updatePackages = asyncHandler(async (req, res) => {
  const response = await UserModel.findById(req.params.userId);

  const package = req.body;

  const test = response.favorites.find((item) => item._id === package._id);
  if (test) {
    const updatedPackage = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { $pull: { favorites: package } },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } else {
    const updatedPackage = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { $push: { favorites: package } },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  }
});

const getFavoritesByUser = asyncHandler(async (req, res) =>{
  const response = await UserModel.findById(req.params.userId).select('favorites');
  res.status(200).json(response)
})

const createUser = asyncHandler(async (req, res) => {
  const packageCreation = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    favorites: [],
  });
  res.status(200).json(packageCreation);
});

module.exports = {
  updatePackages,
  createUser,
  getFavoritesByUser
};
