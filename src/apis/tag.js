// 标签相关的请求
import { request } from '@/utils';

// 获取标签列表
export const getTagListAPI = () =>
	request({
		url: '/tag/list',
		method: 'GET',
	});
