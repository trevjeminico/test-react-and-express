const taskStatusModel = require("../models/taskStatusModel");
const tryCatchFn = require("../utils/tryCatchFunction");
const { getAllStatus } = taskStatusModel;

const status_codes = tryCatchFn(async (req, res) => {
  const statusCodes = await getAllStatus();
  const { status } = statusCodes;
  res.status(status).json(statusCodes);
});

module.exports = { status_codes };
