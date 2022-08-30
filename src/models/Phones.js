const mongoose = require("mongoose");

const PhonesSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// POPULATE FUNCTIONS
// MessagesSchema.set("toObject", { virtuals: true });
// MessagesSchema.set("toJSON", { virtuals: true });

// MessagesSchema.virtual("sender_data", {
//   ref: "Users",
//   localField: "sender_id",
//   foreignField: "_id",
//   justOne: true,
// });

module.exports = mongoose.model("Phones", PhonesSchema);
