// Router

const express = require("express");
const router = express.Router();

const {
  createAdTag,
  getAdTagByPage,
  updateAdTag,
  deleteAdTag,
} = require("../controllers/adTagController");

router.post("/", createAdTag);
router.get("/:page", getAdTagByPage);
router.put("/:id", updateAdTag);
router.delete("/:id", deleteAdTag);

module.exports = router;
