const mongoose = require("mongoose");

const PhonesSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
  },
  phone_area: {
    type: String,
    required: true,
  },
  phone_owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Phones", PhonesSchema);
