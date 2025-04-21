import React from "react";

import TaskForm from "../../components/TaskForm";
import { useParams } from "react-router";
export function TaskPage() {
  const { postId } = useParams();
  return <TaskForm TaskId={postId} />;
}
