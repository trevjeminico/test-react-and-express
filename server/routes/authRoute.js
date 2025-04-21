const express = require("express");

const authCont = require("../controller/authController");

const router = express.Router();

const { register, login, changePassword } = authCont;

const {
  loginValidation,
  registerValidation,
  updatePasswordValidation,
} = require("../middleware/validator");

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.patch("/change-password", updatePasswordValidation, changePassword);

module.exports = router;
