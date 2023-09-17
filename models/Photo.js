const mongoose = require("mongoose");

const Photo = mongoose.model("Photo", {
  photo_name: String,
  photo_year: Number,
  photo_place: String,
  photo_author: String,
  image: Object,
});

module.exports = Photo;
