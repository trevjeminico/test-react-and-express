import React, { useCallback, useEffect, useState } from "react";
import {
  taskStatusCode,
  createTask,
  getTaskbyId,
  updateTask,
} from "../stores/taskSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../utilities/AuthValid";
import { useNavigate } from "react-router";

function TaskForm({ TaskId }) {
  const [taskStatus, setTaskStatus] = useState({});
  const [taskData, setTaskData] = useState({}); // for update
  const dispatch = useDispatch();
  const nav = useNavigate();
  const fetchStatusCodes = useCallback(async () => {
    const req = await dispatch(taskStatusCode());
    const { statusCodes } = req.payload;
    setTaskStatus(statusCodes);
  }, [dispatch]);

  const fetchTaskById = useCallback(async () => {
    const req = await dispatch(getTaskbyId({ taskId: TaskId }));
    const { task } = req.payload;

    if (!task?.length) {
      nav("/task/create");
    } else {
      setTaskData(task);
    }
  }, [dispatch, TaskId, nav]);

  const { uuid } = getUser();

  const handleTaskFlow = async (e) => {
    e.preventDefault();

    const taskForm = new FormData(e.target);
    const flow = taskForm.get("task-flow");

    const params = {
      userId: uuid,
      title: taskForm.get("title"),
      status: taskForm.get("status"),
      description: taskForm.get("description"),
    };

    if (flow === "create") {
      console.log("task created");
      const created = await dispatch(createTask(params));

      if (created?.payload) {
        const { success } = created.payload;
        if (success) {
          nav("/dashboard");
        }
      }
    } else {
      params.taskId = TaskId;
      delete params.userId;
      console.log(params);
      const updated = await dispatch(updateTask(params));
      if (updated?.payload) {
        const { success } = updated.payload;
        if (success) {
          nav("/dashboard");
        }
      }
    }
  };

  const isLoading = false;

  useEffect(() => {
    fetchStatusCodes();

    if (TaskId?.length) {
      fetchTaskById();
    }
  }, [fetchStatusCodes, fetchTaskById, TaskId]);
  const buttonStyleExt = isLoading
    ? "border-blue-300 bg-blue-300 cursor-not-allowed"
    : "border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 cursor-pointer";
  return (
    <div className="ml-25 mr-25 mt-5 mb-5 flex justify-center">
      <section className="bg-white rounded-lg p-6 shadow-md space-y-6 w-full content-center  justify-center">
        <h1 className="text-4xl">
          {taskData?.title ? "Update" : "Create"} Task:
        </h1>
        <form className="" onSubmit={handleTaskFlow}>
          <input
            type="hidden"
            name="task-flow"
            value={taskData[0]?.title ? "update" : "create"}
          />
          <div className="flex m-5 p-5 flex-wrap flex-row">
            <div className="mx-5 basis-1/2">
              <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                  <p>
                    <label
                      htmlFor="title"
                      className="bg-white text-gray-600 px-1"
                    >
                      Title *
                    </label>
                  </p>
                </div>
                <p>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                    defaultValue={taskData[0]?.title}
                  />
                </p>
              </div>
            </div>
            <div className="mx-5">
              <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                  <p>
                    <label
                      htmlFor="title-status"
                      className="bg-white text-gray-600 px-1"
                    >
                      status
                    </label>
                  </p>
                </div>
                <p>
                  <select
                    name="status"
                    id="title-status"
                    className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                  >
                    {!!taskStatus?.length &&
                      taskStatus?.map((value, index) => {
                        return (
                          <option
                            value={value.code}
                            key={index}
                            selected={taskData[0]?.statusCode === value.code}
                          >
                            {value.label}
                          </option>
                        );
                      })}
                  </select>
                </p>
              </div>
            </div>
          </div>
          <div className="m-5 p-5">
            <div className="mx-5">
              <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                  <p>
                    <label
                      htmlFor="desc"
                      className="bg-white text-gray-600 px-1"
                    >
                      Description *
                    </label>
                  </p>
                </div>
                <p>
                  <textarea
                    id="desc"
                    type="text"
                    className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                    rows="10"
                    name="description"
                    defaultValue={taskData[0]?.description}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center">
            <div className="basis-1/2">
              <button
                className={`w-50 px-6 py-3.5 my-5 text-base rounded-[5px]  text-white ${buttonStyleExt} `}
                disabled={isLoading}
              >
                {taskData[0]?.title ? "Update" : "Create"}
              </button>
            </div>

            <div className="basis-1/2">
              <div
                role={"button"}
                className={`w-50 px-6 py-3.5 my-5 text-base rounded-[5px] cursor-pointer hover:underline`}
                onClick={() => {
                  nav("/dashboard");
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

TaskForm.PropTypes = {
  TaskId: PropTypes.any,
};

export default TaskForm;
