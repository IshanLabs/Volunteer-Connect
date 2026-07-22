const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, controller.getPlatformStats);
router.get("/ngos/pending", authMiddleware, controller.getPendingNGOs);
router.patch("/ngos/:id/verify", authMiddleware, controller.verifyNGO);

module.exports = router;
