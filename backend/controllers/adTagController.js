// const AdTag = require('../models/Adtag');

// // Create new ad tag
// exports.createTag = async (req, res) => {
//   try {
//     const tag = new AdTag(req.body);
//     const saved = await tag.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get tag by page
// exports.getTagByPage = async (req, res) => {
//   try {
//     const tag = await AdTag.find({ page: req.params.page });
//     if (!tag) return res.status(404).json({ message: 'Tag not found' });
//     res.json(tag);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update tag
// exports.updateTag = async (req, res) => {
//   try {
//     const updated = await AdTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete tag
// exports.deleteTag = async (req, res) => {
//   try {
//     await AdTag.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Tag deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllTag = async(req,res)=>{
//    try {
//       const tags = await AdTag.find();
//       res.json(tags);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// }

const AdTag = require("../models/Adtag");
// Create script
exports.createAdTag = async (req, res) => {
  const { creatorId, page, script_snippet, placement } = req.body;

  try {
    const newAd = new AdTag({ creatorId, page, script_snippet, placement });
    await newAd.save();
    res.status(201).json({ success: true, message: "Ad script saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get ad scripts for a page
exports.getAdTagByPage = async (req, res) => {
  const { page } = req.params;
  try {
    const scripts = await AdTag.find({ page });
    res.status(200).json(scripts);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update

exports.updateAdTag = async (req, res) => {
  const { id } = req.params;
  const { script_snippet, placement, page } = req.body;
  console.log(id);
  try {
    const updatedAd = await AdTag.findByIdAndUpdate(
      id,
      { script_snippet, placement, page },
      { new: true, runValidators: true}
    );
    console.log("hey");
    if (!updatedAd) {
      return res
        .status(404)
        .json({ success: false, message: "Script not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Script updated", data: updatedAd });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

// Delete
exports.deleteAdTag = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAd = await AdTag.findByIdAndDelete(id);

    if (!deletedAd) {
      return res
        .status(404)
        .json({ success: false, message: "Script not found" });
    }

    res.status(200).json({ success: true, message: "Script deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
