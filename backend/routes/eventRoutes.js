const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

// Public / Volunteer routes
router.get("/", controller.getAllEvents);
router.get("/ngo/my-events", authMiddleware, controller.getNGOEvents);
router.get("/:id", controller.getEventById);

// NGO / Protected routes
router.post("/", authMiddleware, controller.createEvent);
router.delete("/:id", authMiddleware, controller.deleteEvent);

module.exports = router;
