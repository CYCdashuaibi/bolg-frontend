// 上传相关的请求
import { request } from '@/utils';

/**
 * 上传文件接口
 * @param {FormData} formData - 包含文件和其他参数的数据，需包含 'file' 字段
 * @param {string} category - 指定文件保存的目录，比如 'article', 'avatar', 'image'
 * @returns Promise
 */
export const uploadFileAPI = (formData, category) => {
	// 如果指定了 category，就追加到 FormData 中
	if (category) {
		formData.append('category', category);
	}
	return request({
		url: `/upload?category=${category}`,
		method: 'POST',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
