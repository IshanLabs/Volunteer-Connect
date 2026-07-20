const express = require("express");

const router = express.Router();

const controller = require("../controllers/authController");

console.log(controller);

router.post("/signup", controller.signup);

module.exports = router;