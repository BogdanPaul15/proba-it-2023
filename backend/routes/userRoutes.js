const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// User available routes

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/checkToken", authController.checkToken);

module.exports = router;
