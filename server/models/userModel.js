const db = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new db.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const usersModels = db.model("users", userSchema);

const loginChecker = async function (body) {
  const { email, password } = body;
  const getUserByEmail = await usersModels.findOne({ email });
  const returnObj = {
    success: false,
    status: 0,
    message: "",
  };

  if (!getUserByEmail) {
    returnObj.status = 403;
    returnObj.message = "no record found";
    return returnObj;
  }

  const isMatch = await bcrypt.compare(
    String(password),
    String(getUserByEmail.password)
  );

  if (!isMatch) {
    returnObj.status = 403;
    returnObj.errors = [
      {
        err_path: "password",
        err_msg: "password does not match on the database",
      },
    ];
    return returnObj;
  }

  const UserId = getUserByEmail._id.toString();

  // token for auth here
  const token = jwt.sign({ UserId }, "jwtSecret", {
    expiresIn: 86400000,
  });

  returnObj.success = true;
  returnObj.status = 200;
  returnObj.message = "we found records";
  returnObj.tokenAuth = token;
  returnObj.user = {
    email: getUserByEmail.email,
    name: getUserByEmail.name,
    uuid: UserId,
    date_joined: getUserByEmail.createdAt,
  };

  return returnObj;
};

const registerUser = async function (body) {
  const { name, email, password, passwordIsValid } = body;

  const isExisted = await usersModels.findOne({ email });

  const returnJson = {
    success: false,
    status: 0,
    message: "",
  };

  if (isExisted) {
    returnJson.success = true;
    returnJson.status = 400;
    returnJson.message = "User Existed";
    return returnJson;
  }

  if (!passwordIsValid) {
    returnJson.success = true;
    returnJson.status = 400;
    returnJson.message = "password is invalid";
    return returnJson;
  }

  const newUser = new usersModels({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash;

  const hasRegistered = await newUser.save();

  returnJson.success = true;
  returnJson.status = 200;
  returnJson.user = {
    id: hasRegistered.id,
    name: hasRegistered.name,
    email: hasRegistered.email,
  };

  return returnJson;
};

const updatePassword = async function (body) {
  const returnObj = {
    success: false,
    error: null,
    status: 401,
    message: null,
  };

  const errArray = [];

  const { uuid, oldPassword, newPassword, passwordValid } = body;

  const getUserByEmail = await usersModels.findById({ _id: uuid });

  const isMatch = await bcrypt.compare(
    String(oldPassword),
    String(getUserByEmail.password)
  );

  if (!passwordValid) {
    errArray.push({
      err_path: "newPassword",
      err_msg: "New password must have the following check list",
    });
  }

  if (isMatch) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    usersModels
      .findByIdAndUpdate({ _id: uuid }, { $set: { password: hash } })
      .exec();
    returnObj.success = true;
    returnObj.status = 200;
    delete returnObj.error;
  } else {
    errArray.push({
      err_path: "oldPassowrd",
      err_msg: "password does not match",
    });
  }

  if (errArray?.length > 0) {
    returnObj.error = errArray;
  } else {
    delete returnObj.error;
  }

  return returnObj;
};

module.exports = { loginChecker, registerUser, updatePassword };
