const express = require("express");

const taskCont = require("../controller/taskController");

const router = express.Router();

const { taskCreate, taskUpdate, taskDelete, getAllUserTask, getTaskbyId } =
  taskCont;

router.get("/user-task/:userId", getAllUserTask);

router.get("/edit-task/:taskId", getTaskbyId);

router.post("/create-task", taskCreate);

router.patch("/update-task", taskUpdate);

router.delete("/delete-task", taskDelete);

module.exports = router;
