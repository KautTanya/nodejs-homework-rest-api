const express = require("express");
const router = express.Router();
const controlers = require("../../controllers/auth/index");
const { uploadController } = require("../../controllers/fileSystem/fileController");
const userMiddlevare = require("../../middlewares/userMiddleware");
const { fileMiddleware } = require("../../middlewares/fileMiddleware");
const { emailMiddlevare } = require("../../middlewares/authMiddleware");

router.post("/signup", async (req, res, next) => {
  controlers.registrationController(req, res, next);
});
router.post("/verify", emailMiddlevare, controlers.verificationController);

router.get(
  "/verify/:verificationToken",
  controlers.registerVerificationController
);
router.post("/login", async (req, res, next) => {
  controlers.loginController(req, res, next);
});
router.get("/logout", async (req, res, next) => {
  controlers.logoutController(req, res, next);
});
router.get("/current", userMiddlevare, async (req, res, next) => {
  controlers.currentController(req, res, next);
});
router.patch("/avatars", fileMiddleware.single("avatar"), async (req, res, next) => {
  uploadController(req, res, next);
  }
);
module.exports = router;
