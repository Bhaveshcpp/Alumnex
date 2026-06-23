const express = require("express");
const router = express.Router();
const {
  getThreads,
  getThreadById,
  getCompanyStats,
  getDifficultyStats,
  getYearStats,
} = require("../controllers/thread.controller");
const upload = require("../middleware/upload.middleware");
const protectAdmin = require("../middleware/adminAuth.middleware");




router.get("/", getThreads);
router.get("/stats/company", getCompanyStats);
router.get("/stats/difficulty", getDifficultyStats);
router.get("/stats/year", getYearStats);


router.get("/:id", getThreadById);

module.exports = router;
