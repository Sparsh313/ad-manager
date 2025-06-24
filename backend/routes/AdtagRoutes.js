const express = require("express");
const router = express.Router();

const {
  createTag,
  getTagByPage,
  updateTag,
  deleteTag,
  getAllTag,
} = require("../controllers/adTagController");

router.post("/", createTag);
router.get("/all", getAllTag);
router.get("/:page", getTagByPage);
router.patch("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
    