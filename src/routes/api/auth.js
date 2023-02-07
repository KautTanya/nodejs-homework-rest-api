const express = require("express");
const router = express.Router();
const controlers = require("../../controllers/auth/index");
const userMiddlevare = require("../../middlewares/userMiddleware");

router.post("/signup", async (req, res, next) => {
  controlers.registrationController(req, res, next);
});
router.post("/login", async (req, res, next) => {
  controlers.loginController(req, res, next);
});
router.get("/logout", async (req, res, next) => {
  controlers.logoutController(req, res, next);
});
router.get("/current", userMiddlevare, async (req, res, next) => {
  controlers.currentController(req, res, next);
});
module.exports = router;
