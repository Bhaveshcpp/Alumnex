const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/admin.controller");
const { createThread } = require("../controllers/thread.controller");
const protectAdmin = require("../middleware/adminAuth.middleware");
const upload = require("../middleware/upload.middleware");
const {
  bulkUploadThreads
} = require("../controllers/thread.controller");

router.post("/login", loginAdmin);
router.post("/thread", protectAdmin, createThread);
router.post("/bulk-upload", protectAdmin, upload.single("file"), bulkUploadThreads);

module.exports = router;
