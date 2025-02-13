// 用户相关的请求
import { request } from '@/utils';

// 登录
export const loginAPI = (data) =>
	request({
		url: '/auth/login',
		method: 'POST',
		data: data,
	});

// 退出登录
export const logoutAPI = () =>
	request({
		url: '/auth/logout',
		method: 'POST',
	});

// 发送验证码
export const sendCodeAPI = (data) =>
	request({
		url: '/auth/send-code',
		method: 'POST',
		data: data,
	});

// 校验验证码
export const verifyCodeAPI = (data) =>
	request({
		url: '/auth/verify-code',
		method: 'POST',
		data: data,
	});

// 注册
export const registerAPI = (data) =>
	request({
		url: '/auth/register',
		method: 'POST',
		data: data,
	});

// 获取用户列表
export const getUserListAPI = () =>
	request({
		url: '/user/list',
		method: 'GET',
	});

// 获取用户信息
export const getProfileAPI = () =>
	request({
		url: '/user/profile',
		method: 'GET',
	});
