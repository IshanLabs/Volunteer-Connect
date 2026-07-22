const express = require("express");

const router = express.Router();

const controller = require("../controllers/authController");

console.log(controller);

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/send-otp", controller.sendOTP);
router.post("/verify-otp", controller.verifyOTP);

module.exports = router;