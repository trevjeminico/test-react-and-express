const db = require("../config/dbConnection");

const taslStatusSchema = new db.Schema({
  code: { type: Number },
  label: { type: String },
  description: { type: String },
});

const taskStatusModel = db.model("task_statuscodes", taslStatusSchema);

const getAllStatus = async function () {
  const allStatus = await taskStatusModel.find({});
  const returnObj = {
    status: 401,
    success: false,
    message: "",
  };

  if (allStatus) {
    returnObj.status = 200;
    returnObj.message = "";
    returnObj.success = true;
    returnObj.statusCodes = allStatus;
  }

  return returnObj;
};

module.exports = { getAllStatus };
