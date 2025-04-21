import React, { useCallback, useEffect, useState } from "react";
import { getAllUserTask } from "../../stores/taskSlice";
import { useDispatch } from "react-redux";
import UserTaskTable from "../../components/UserTaskTable";
import UserDashboard from "../../components/UserDashboard";
import { getUser } from "../../utilities/AuthValid";

export function DashBoard() {
  const [userAllTasks, setUserAllTasks] = useState({});
  const dispatch = useDispatch();
  const { uuid } = getUser();
  const fetchUserTask = useCallback(() => {
    dispatch(getAllUserTask({ userId: uuid })).then((result) => {
      const { allTask } = result.payload;
      setUserAllTasks(allTask);
    });
  }, [dispatch, uuid]);

  useEffect(() => {
    fetchUserTask();
  }, [dispatch, uuid, fetchUserTask]);
  return (
    <>
      <UserDashboard />
      <UserTaskTable data={userAllTasks} />
    </>
  );
}
