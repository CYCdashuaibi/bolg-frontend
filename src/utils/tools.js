import { message } from 'antd';
import dayjs from 'dayjs';

import { uploadFileAPI } from '@/apis/upload';
import { IMAGE_BASE_URL } from '@/utils/config';

import DefaultAvatar from '@/assets/images/default_avatar.png';

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
export const handleRemoveBaseUrl = (url) => url.replace(IMAGE_BASE_URL, '');

/**
 * 格式化时间
 * @param {*} time 时间
 * @param {*} format 格式
 * @returns 格式化后的时间
 */
export const handleFormatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') =>
	dayjs(new Date(time)).format(format);

/**
 * 处理头像
 * @param {*} avatar 头像
 * @returns 处理后的头像
 */
export const handleAvatar = (avatar) => {
	if (!avatar) return DefaultAvatar;
	return avatar.startsWith('http') ? avatar : handleInsertValue(avatar);
};

/*
 * 格式化时间为 刚刚、几分钟前、几小时前、几天前
 * @param {*} inputTime 时间
 * @returns 格式化后的时间
 */
export const formatTime = (inputTime) => {
	const now = new Date(); // 当前时间
	const targetTime = new Date(inputTime); // 输入时间
	const diff = now - targetTime; // 时间差（毫秒）

	// 时间差转换为秒、分钟、小时、天
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	// 补零函数（用于日期格式化）
	const padZero = (n) => n.toString().padStart(2, '0');

	if (seconds < 60) {
		return '刚刚';
	} else if (minutes < 60) {
		return `${minutes}分钟前`;
	} else if (hours < 24) {
		return `${hours}小时前`;
	} else {
		return handleFormatTime(inputTime);
	}
}
