const mongoose = require('mongoose');

const adTagSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  tags: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
    otherTags: [{ type: String }],
  },
  apiKey: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdTag', adTagSchema);
