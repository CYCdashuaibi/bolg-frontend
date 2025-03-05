/**
 * 高效更新评论树（找到目标后立即停止遍历）
 * @param {Array} comments - 评论列表
 * @param {string|number} targetId - 目标评论ID
 * @param {Function} modifier - 修改函数
 * @returns {Array} 更新后的新评论树
 */
export const updateCommentTree = (comments, targetId, modifier) => {
	// 创建浅拷贝以避免修改原始数组
	const newComments = [...comments];

	for (let i = 0; i < newComments.length; i++) {
		const comment = newComments[i];

		// 找到目标评论
		if (comment.id === targetId) {
			newComments[i] = modifier({ ...comment });
			return newComments; // 立即终止整个遍历
		}

		// 处理子评论
		if (comment.children?.length) {
			// 递归搜索子级
			const result = updateCommentTree(
				comment.children,
				targetId,
				modifier,
			);

			// 如果子级中找到匹配项
			if (result !== comment.children) {
				return [
					...newComments.slice(0, i),
					{ ...comment, children: result },
					...newComments.slice(i + 1),
				];
			}
		}
	}

	return newComments;
};

/**
 * 删除评论
 * @param {Array} comments - 评论列表
 * @param {string|number} targetId - 目标评论ID
 */
export const deleteCommentById = (comments, targetId) => {
	const newComments = [...comments];

	for (let i = 0; i < newComments.length; i++) {
		const comment = newComments[i];

		if (comment.id === targetId) {
			newComments.splice(i, 1);
			return newComments;
		}

		if (comment.children?.length) {
			const result = deleteCommentById(comment.children, targetId);
			if (result !== comment.children) {
				return [
					...newComments.slice(0, i),
					{ ...comment, children: result },
					...newComments.slice(i + 1),
				];
			}
		}
	}

	return newComments;
};
