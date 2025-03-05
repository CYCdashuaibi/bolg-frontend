import { request } from '@/utils';

// 创建文章
export const createArticleAPI = (data) =>
	request({
		url: '/article/create',
		method: 'POST',
		data,
	});

// 获取文章列表
export const getArticleListAPI = (params) =>
	request({
		url: '/article/list',
		method: 'GET',
		params,
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

// 获取文章评论列表
export const getCommentListAPI = (params) =>
	request({
		url: `/article/comment/list`,
		method: 'GET',
		params,
	});

// 评论文章
export const commentArticleAPI = (data) =>
	request({
		url: `/article/comment/create`,
		method: 'POST',
		data,
	});

// 点赞评论
export const likeCommentAPI = (id) =>
	request({
		url: `/article/comment/like/${id}`,
		method: 'POST',
	});

// 取消点赞评论
export const unLikeCommentAPI = (id) =>
	request({
		url: `/article/comment/unlike/${id}`,
		method: 'POST',
	});

// 根据传入的评论 id，返回该评论详情及其所有后续回复（树状结构）
export const getRelatedCommentAPI = (id, article_id) =>
	request({
		url: `/article/comment/related/${id}`,
		method: 'GET',
		params: {
			article_id,
		},
	});

// 删除评论
export const deleteCommentAPI = (id) =>
	request({
		url: `/article/comment/${id}`,
		method: 'DELETE',
	});


