// AdTagController

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
  // console.log(id);
  try {
    const updatedAd = await AdTag.findByIdAndUpdate(
      id,
      { script_snippet, placement, page },
      { new: true, runValidators: true}
    );
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
