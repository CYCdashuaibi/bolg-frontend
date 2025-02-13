import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '@/layout';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Forget = lazy(() => import('@/pages/Forget'));
const Welcome = lazy(() => import('@/pages/Welcome'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Home = lazy(() => import('@/pages/Home'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/welcome" replace />,
	},
	{
		name: '登录',
		path: '/login',
        element: <Login />,
	},
	{
		name: '注册',
		path: '/register',
		element: <Register />,
	},
	{
		name: '忘记密码',
		path: '/forget',
		element: <Forget />,
	},
	{
		name: '欢迎',
		path: '/welcome',
		element: <Welcome />,
	},
	{
		path: '/home',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />
			}
		]
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;