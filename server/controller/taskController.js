const taskModel = require("../models/taskModel");
const tryCatchFn = require("../utils/tryCatchFunction");
const {
  createTask,
  updateTask,
  deleteTask,
  fetchAllTaskByUserId,
  fetchTaskById,
} = taskModel;

const taskCreate = tryCatchFn(async (req, res) => {
  const doCreate = await createTask(req.body);
  const { status } = doCreate;
  res.status(status).json(doCreate);
});

const taskUpdate = tryCatchFn(async (req, res) => {
  const doUpdate = await updateTask(req.body);
  const { status } = doUpdate;
  res.status(status).json(doUpdate);
});

const taskDelete = tryCatchFn(async (req, res) => {
  const doDelete = await deleteTask(req.body);
  const { status } = doDelete;
  res.status(status).json(doDelete);
});

const getAllUserTask = tryCatchFn(async (req, res) => {
  const allTask = await fetchAllTaskByUserId(req.params);
  const { status } = allTask;
  res.status(status).json(allTask);
});

const getTaskbyId = tryCatchFn(async (req, res) => {
  const taskData = await fetchTaskById(req.params);
  const { status } = taskData;
  res.status(status).json(taskData);
});

module.exports = {
  taskCreate,
  taskUpdate,
  taskDelete,
  getAllUserTask,
  getTaskbyId,
};
