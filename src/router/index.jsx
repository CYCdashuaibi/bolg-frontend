import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/home" replace />,
	},
	{
		name: '登录',
		path: '/login',
        element: <Login />,
	},
	{
		name: '首页',
		path: '/home',
		element: <Home />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;