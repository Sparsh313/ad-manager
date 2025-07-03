// AdTag

const mongoose = require("mongoose");

const Adtag = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      // required: true,
    },
    page: {
      type: String,
      required: true,
    },
    script_snippet: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      enum: ["head", "body"],
      default: "body",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adtag", Adtag);
