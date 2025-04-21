const { body, validationResult, param } = require("express-validator");

const returnObj = {
  success: false,
  status: 400,
  message: "",
  errors: "",
};

const loginValidation = [
  body("email").trim().isEmail().withMessage("E-mail Incorrect"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password Incorrect"),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const errorMessages = err
        .array()
        .map((error) => ({ err_path: error.path, err_msg: error.msg }));
      returnObj.errors = errorMessages;
      return res.status(returnObj.status).json(returnObj);
    }
    next();
  },
];

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must have the following check list"),
  body("passwordIsValid").isBoolean(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const errorMessages = err
        .array()
        .map((error) => ({ err_path: error.path, err_msg: error.msg }));
      returnObj.errors = errorMessages;
      return res.status(returnObj.status).json(returnObj);
    }
    next();
  },
];

const updatePasswordValidation = [
  body("oldPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is incorrect"),
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("New Password must have the following check list "),
  body("passwordValid")
    .isBoolean()
    .custom((value) => {
      if (!value) {
        throw new Error("password and confirm password are not the same");
      }
    }),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const errorMessages = err
        .array()
        .map((error) => ({ err_path: error.path, err_msg: error.msg }));
      returnObj.errors = errorMessages;
      return res.status(returnObj.status).json(returnObj);
    }
    next();
  },
];

module.exports = {
  loginValidation,
  registerValidation,
  updatePasswordValidation,
};
