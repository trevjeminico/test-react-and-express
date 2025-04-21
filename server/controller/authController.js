const UserModel = require("../models/userModel");
const tryCatchFn = require("../utils/tryCatchFunction");
const { loginChecker, registerUser, updatePassword } = UserModel;

const register = tryCatchFn(async (req, res) => {
  const doRegister = await registerUser(req.body);
  const { status } = doRegister;
  res.status(status).json(doRegister);
});

const login = tryCatchFn(async (req, res) => {
  const checkedCredentials = await loginChecker(req.body);
  const { status } = checkedCredentials;
  res.status(status).json(checkedCredentials);
});

const changePassword = tryCatchFn(async (req, res) => {
  const updatePass = await updatePassword(req.body);
  const { status } = updatePass;
  res.status(status).json(updatePass);
});

module.exports = { register, login, changePassword };
