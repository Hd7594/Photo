const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");
const fileUpload = require("express-fileupload");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/photo/upload", fileUpload(), async (req, res) => {
  try {
    const { title, year, place, author } = req.body;

    const image = req.files.image;
    const finalPhoto = await cloudinary.uploader.upload(convertToBase64(image));

    //console.log(req.files);

    const addPhoto = new Photo({
      photo_name: title,
      photo_year: year,
      photo_place: place,
      photo_author: author,
      image: finalPhoto,
    });
    console.log(addPhoto);
    await addPhoto.save();
    res.json(addPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
