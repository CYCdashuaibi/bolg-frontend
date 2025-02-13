// 分类相关的请求
import { request } from '@/utils';

// 获取分类列表
export const getCategoryListAPI = () =>
	request({
		url: '/category/list',
		method: 'GET',
	});
