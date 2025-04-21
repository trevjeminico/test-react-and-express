import React from "react";
import { Routes, Route } from "react-router";
import AuthRegister from "../pages/RegisterPage";
import AuthLogin from "../pages/LoginPage";
import Layout from "../pages/Layout";
import PageNotFound from "../pages/PageNotFound";
import DashBoard from "../pages/DashBoardPage";
import AuthLayout from "../pages/AuthLayout";
import TaskPage from "../pages/TaskPage";

function RoutePages() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="task/create" element={<TaskPage />} />
        <Route path="task/edit/:postId" element={<TaskPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoutePages;
