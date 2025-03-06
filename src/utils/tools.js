import { message } from 'antd';
import dayjs from 'dayjs';

import { uploadFileAPI } from '@/apis/upload';
import { IMAGE_BASE_URL } from '@/utils/config';

import DefaultAvatar from "@/assets/images/default_avatar.png";

export const handleUpload = (files, category) => {
	const formData = new FormData();
	files.forEach((file) => formData.append('files', file));
	return new Promise((resolve, reject) => {
		uploadFileAPI(formData, category)
			.then((res) => {
				resolve(res.urls);
			})
			.catch((err) => reject(err));
	});
};

/**
 * 为图片加上 baseUrl
 * @param {*} url 图片url
 * @returns 加上 baseUrl 的图片url
 */
export const handleInsertValue = (url) => `${IMAGE_BASE_URL}${url}`;

/**
 * 移除 url 中的 baseUrl
 * @param {*} url 图片url
 * @returns 移除 baseUrl 的图片url
 */
export const handleRemoveBaseUrl = (url) => url.replace(IMAGE_BASE_URL, "");

/**
 * 格式化时间
 * @param {*} time 时间
 * @param {*} format 格式
 * @returns 格式化后的时间
 */
export const handleFormatTime = (time, format = "YYYY-MM-DD HH:mm:ss") => dayjs(new Date(time)).format(format);

/**
 * 处理头像
 */
export const handleAvatar = (avatar) => {
	if (!avatar) return DefaultAvatar;
	return avatar.startsWith("http") ? avatar : handleInsertValue(avatar);
};
