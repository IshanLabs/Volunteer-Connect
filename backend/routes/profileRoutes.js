const express = require("express");
const router = express.Router();
const controller = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, controller.getMyProfile);
router.put("/volunteer", authMiddleware, controller.updateVolunteerProfile);
router.put("/ngo", authMiddleware, controller.updateNGOProfile);

module.exports = router;
