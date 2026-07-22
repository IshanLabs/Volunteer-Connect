const express = require("express");
const router = express.Router();
const controller = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, controller.applyForEvent);
router.get("/my-applications", authMiddleware, controller.getVolunteerApplications);
router.get("/event/:eventId", authMiddleware, controller.getEventApplications);
router.patch("/:id/status", authMiddleware, controller.updateApplicationStatus);

module.exports = router;
