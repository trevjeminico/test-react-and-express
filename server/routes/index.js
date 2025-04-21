const express = require("express");

const router = express.Router();

router.use("/v1", require("./userRoute"));
router.use("/v1/auth", require("./authRoute"));
router.use("/v1/taskstatus", require("./statusRoute"));
router.use("/v1/tasks", require("./taskRoute"));

module.exports = router;
