const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/auth/index');

router.post("/register", async (req, res, next) => {
    controllers.registerController(req, res, next);
  })