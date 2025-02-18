import axios from 'axios';
import { getToken, removeToken } from './token';
import { message } from 'antd';
import router from '@/router';

const request = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// 检查 error 对象中是否有 response 属性
		if (error.response) {
			const code = error?.response?.status;
			const data = error?.response?.data;
			const msg = error?.response?.data?.message;
			
			switch (code) {
				case 400:
					if (data.validate === false && data.errors.length) {
						message.error(data.errors[0].msg);
						return;
					}
					message.error(msg || '请求错误 (400)');
					break;
				case 401:
					message.error(msg || '未授权，请重新登录 (401)');
					removeToken();
					router.navigate('/login');
					break;
				case 403:
					message.error(msg || '拒绝访问 (403)');
					break;
				case 404:
					message.error(msg || '请求出错 (404)');
					break;
				case 408:
					message.error(msg || '请求超时 (408)');
					break;
				// 其他错误码处理
				default:
					message.error(msg || `连接出错 (${code})!`);
			}
		} else {
			message.error('连接到服务器失败，请检查网络连接！');
		}
		// return Promise.reject(error);
		console.error(error);
		return null;
	},
);

export { request };
