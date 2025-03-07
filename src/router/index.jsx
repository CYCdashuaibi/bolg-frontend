import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "@/layout";
import { RequireNoAuth, RequireAuth } from "@/components";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Forget = lazy(() => import("@/pages/Forget"));
const Welcome = lazy(() => import("@/pages/Welcome"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const EditArticle = lazy(() => import("@/pages/Article/EditArticle"));
const ArticleView = lazy(() => import("@/pages/Article/ArticleView"));
const UserInfo = lazy(() => import("@/pages/UserInfo"));
const Profile = lazy(() => import("@/pages/Profile"));
const PublishSuccess = lazy(() => import("@/pages/Article/PublishSuccess"));

const Home = lazy(() => import("@/pages/Home"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/welcome" replace />,
	},
	{
		name: "登录",
		path: "/login",
		element: (
			<RequireNoAuth>
				<Login />
			</RequireNoAuth>
		),
	},
	{
		name: "注册",
		path: "/register",
		element: (
			<RequireNoAuth>
				<Register />
			</RequireNoAuth>
		),
	},
	{
		name: "忘记密码",
		path: "/forget",
		element: <Forget />,
	},
	{
		name: "欢迎",
		path: "/welcome",
		element: <Welcome />,
	},
	{
		name: "创建文章",
		path: "edit-article/:id?",
		element: (
			<RequireAuth>
				<EditArticle />
			</RequireAuth>
		),
	},
	{
		path: "/cyc",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Navigate to="/cyc/home" replace />,
			},
			{
				name: "首页",
				path: "home",
				element: <Home />,
			},
			{
				name: "查阅文章",
				path: "article-view/:id",
				element: <ArticleView />,
			},
			{
				name: "用户信息",
				path: "user/:id/:tab?",
				element: <UserInfo />,
			},
			{
				name: "个人资料",
				path: "profile",
				element: (
					<RequireAuth>
						<Profile />
					</RequireAuth>
				),
			},
			{
				name: "发布成功",
				path: "publish-success",
				element: <PublishSuccess />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
