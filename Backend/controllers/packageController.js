const asyncHandler = require("express-async-handler");

const Package = require("../model/packageModel");

const getPackages = asyncHandler(async (req, res) => {
  const package = await Package.find();
  res.status(200).json(package);
});

const createPackages = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  const packageCreation = await Package.create({
    description: req.body.description,
    image: req.body.image,
    images: req.body.images,
    price: req.body.price,
    title: req.body.title,
    location:  req.body.location,
    duration: req.body.duration,
    rating: req.body.rating
  });
  res.status(200).json(packageCreation);
});

const updateackages = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);
  console.log("second", package)

  if(!package){
    res.status(400)
    throw new Error('Package not found')
  }
  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPackage);
});

const deletePackages = asyncHandler(async (req, res) => {
    const package = await Package.findById(req.params.id);

  if(!package){
    res.status(400)
    throw new Error('Package not found')
  }
    await package.remove();
  res.status(200).json("package Deleted Successfully");
});

module.exports = { getPackages, createPackages, updateackages, deletePackages };
