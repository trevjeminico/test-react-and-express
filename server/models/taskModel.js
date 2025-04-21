const db = require("../config/dbConnection");

const taskSchema = db.Schema(
  {
    userId: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    statusCode: { type: Number },
  },
  { timestamps: true }
);

const taskModel = db.model("user_tasks", taskSchema);

const createTask = async function (body) {
  const returnObj = {
    success: false,
    status: 401,
    errors: null,
    message: null,
  };
  const { userId, title, description, status } = body;
  const newTask = new taskModel({
    userId,
    title,
    description,
    statusCode: status,
  });

  const taskIsCreated = await newTask.save();

  if (taskIsCreated) {
    returnObj.success = true;
    returnObj.status = 200;
    returnObj.message = "The Task is Successfully Created!";
  }
  return returnObj;
};

const updateTask = async function (body) {
  const returnObj = {
    success: false,
    status: 401,
    errors: null,
    message: null,
  };
  const { taskId, title, description, status } = body;
  const taskUpdateSets = {
    $set: { title: title, description: description, statusCode: status },
  };

  const taskIsUpdated = await taskModel
    .findByIdAndUpdate({ _id: taskId }, taskUpdateSets)
    .exec();

  if (taskIsUpdated) {
    returnObj.success = true;
    returnObj.status = 200;
    returnObj.message = "The Task is Successfully Updated";
  }
  return returnObj;
};

const deleteTask = async function (body) {
  const returnObj = {
    success: false,
    status: 401,
    errors: null,
    message: null,
  };
  const { taskId } = body;
  const taskIsUpdated = await taskModel
    .findByIdAndDelete({ _id: taskId })
    .exec();

  if (taskIsCreated) {
    returnObj.success = true;
    returnObj.status = 200;
    returnObj.message = "The Task is Successfully Deleted!";
  }

  return returnObj;
};

const fetchTaskById = async function (body) {
  const returnObj = {
    success: false,
    status: 401,
    errors: null,
    message: null,
  };
  const { taskId } = body;
  const taskData = await taskModel.find({ _id: taskId });

  if (taskData?.length > 0) {
    returnObj.success = true;
    returnObj.message = "task retrieve";
    returnObj.errors = false;
    returnObj.task = taskData;
    returnObj.status = 201;
  }

  return returnObj;
};

const fetchAllTaskByUserId = async (body) => {
  const returnObj = {
    success: false,
    status: 401,
    errors: null,
    message: null,
  };
  const { userId } = body;
  const allTaskByUser = await taskModel.find({ userId: userId });

  if (allTaskByUser?.length > 0) {
    returnObj.success = true;
    returnObj.message = "list of all task by user";
    returnObj.errors = false;
    returnObj.allTask = allTaskByUser;
    returnObj.status = 201;
  }

  return returnObj;
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  fetchAllTaskByUserId,
  fetchTaskById,
};
