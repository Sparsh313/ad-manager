const AdTag = require('../models/Adtag');

// Create new ad tag
exports.createTag = async (req, res) => {
  try {
    const tag = new AdTag(req.body);
    const saved = await tag.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tag by page
exports.getTagByPage = async (req, res) => {
  try {
    const tag = await AdTag.find({ page: req.params.page });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update tag
exports.updateTag = async (req, res) => {
  try {
    const updated = await AdTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete tag
exports.deleteTag = async (req, res) => {
  try {
    await AdTag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTag = async(req,res)=>{
   try {
      const tags = await AdTag.find();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}