import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "@/utils";
import { message } from "antd";

// 用户如果已经登录，则跳转到首页
export const RequireNoAuth = ({ children }) => {
	if (getToken()) {
		return <Navigate to="/cyc/home" replace />;
	}
	return children;
};

// 用户如果未登录，则跳转到登录页
export const RequireAuth = ({ children }) => {
	if (!getToken()) {
		message.error("请先登录");
		return <Navigate to="/login" replace />;
	}
	return children;
};
