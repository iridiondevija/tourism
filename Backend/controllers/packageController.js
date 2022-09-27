const asyncHandler = require("express-async-handler");

const TripPackages = require("../model/packageModel");

const getAllPackages = asyncHandler(async (req, res) => {
  const response = await TripPackages.find()
  .select([
    "title",
    "location",
    "rating",
    "price",
    "defaultImage",
  ]);
  res.status(200).json(response);
});

const getDetailPackage = asyncHandler(async (req, res) => {
  const response = await TripPackages.findById(req.params.id).select([
    "-availabilityPeriod",
    "-defaultImage",
  ]);
  res.status(200).json(response);
});

const getPackageDates = asyncHandler(async (req, res) => {
  const response = await TripPackages.findById(req.params.id).select([
    "availabilityPeriod",
    "price"
  ]);
  res.status(200).json(response);
});

const createPackages = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  const packageCreation = await TripPackages.create({
    description: req.body.description,
    defaultImage: req.body.defaultImage,
    carouselImages: req.body.carouselImages,
    price: req.body.price,
    title: req.body.title,
    location: req.body.location,
    duration: req.body.duration,
    rating: req.body.rating,
    availabilityPeriod: req.body.availabilityPeriod,
  });
  res.status(200).json(packageCreation);
});

const updatePackages = asyncHandler(async (req, res) => {
  const response = await TripPackages.findById(req.params.id);

  if (!response) {
    res.status(400);
    throw new Error("Package not found");
  }
  const updatedPackage = await TripPackages.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPackage);
});

const deletePackages = asyncHandler(async (req, res) => {
  const response = await TripPackages.findById(req.params.id);

  if (!response) {
    res.status(400);
    throw new Error("Package not found");
  }
  await response.remove();
  res.status(200).json("response Deleted Successfully");
});

module.exports = {
  getAllPackages,
  createPackages,
  updatePackages,
  deletePackages,
  getDetailPackage,
  getPackageDates
};
