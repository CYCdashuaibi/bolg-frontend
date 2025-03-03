import { request } from '@/utils';

// 创建文章
export const createArticleAPI = (data) =>
	request({
		url: '/article/create',
		method: 'POST',
		data,
	});

// 获取文章列表
export const getArticleListAPI = (data) =>
	request({
		url: '/article/list',
		method: 'GET',
		data,
	});

// 获取文章详情
export const getArticleDetailAPI = (id) =>
	request({
		url: `/article/detail/${id}`,
		method: 'GET',
	});

// 更新文章
export const updateArticleAPI = (id, data) =>
	request({
		url: `/article/update/${id}`,
		method: 'PUT',
		data,
	});

// 删除文章
export const deleteArticleAPI = (id) =>
	request({
		url: `/article/delete/${id}`,
		method: 'DELETE',
	});

// 点赞文章
export const likeArticleAPI = (id) =>
	request({
		url: `/article/like/${id}`,
		method: 'POST',
	});

// 取消点赞文章
export const unLikeArticleAPI = (id) =>
	request({
		url: `/article/unlike/${id}`,
		method: 'POST',
	});



