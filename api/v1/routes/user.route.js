const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const userValidates = require("../../../validates/client/user.validate");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/register",userValidates.registerPost, controller.register);
router.post("/login",userValidates.loginPost, controller.login);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", controller.resetPassword);
router.get("/detail",authMiddleware.requireAuth, controller.detail);
router.get("/list",authMiddleware.requireAuth, controller.list);

module.exports = router;

