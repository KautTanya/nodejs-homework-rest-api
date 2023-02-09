const { registrationController } = require("./registration");
const { loginController } = require("./login");
const { logoutController } = require("./logout");
const { currentController } = require("./current");
const { registerVerificationController } = require("./registerVerification");
const {verificationController} = require("./verificationController");
module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  registerVerificationController,
  verificationController,
};