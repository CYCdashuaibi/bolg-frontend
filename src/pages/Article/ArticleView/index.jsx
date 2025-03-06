/**
 * @fileoverview 查阅文章
 */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Input, Button, Empty, Tooltip } from "antd";
import { useParams, NavLink } from "react-router-dom";
import { useSetState } from "ahooks";

import {
	getArticleDetailAPI,
	commentArticleAPI,
	getCommentListAPI,
	likeCommentAPI,
	unLikeCommentAPI,
	getRelatedCommentAPI,
	deleteCommentAPI,
} from "@/apis/article";
import { handleFormatTime, handleAvatar } from "@/utils";
import { updateCommentTree, deleteCommentById } from "./fn";

import { MarkdownPreview } from "@/components";
import { CommentItem } from "./components";

import { ArticleViewStyle } from "./style";

const COMMENT_PAGE_SIZE = 10;

const initialState = {
	articleDetail: {},
	loading: true,
	isFocus: false,
	commentContent: "",
	commentList: [],
	commentListLoading: true,
	commentListPage: 1,
	commentListTotal: 0,
	total: 0,
	sendCommentLoading: false,
};

const ArticleView = () => {
	const { id } = useParams();
	const [state, setState] = useSetState(initialState);
	const {
		articleDetail,
		loading,
		isFocus,
		commentContent,
		commentList,
		commentListLoading,
		commentListPage,
		commentListTotal,
		total,
		sendCommentLoading,
	} = state;

	const dispatch = useDispatch();
	const { token, userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		getArticleDetail();
		getCommentList();
	}, []);

	const getArticleDetail = () => {
		setState({ loading: true });
		getArticleDetailAPI(id)
			.then((res) => {
				if (res.success) {
					setState({ articleDetail: res.data });
					window.document.title = `${res.data.title}`;
				}
			})
			.finally(() => {
				setState({ loading: false });
			});
	};

	const getCommentList = (isRefresh = false) => {
		getCommentListAPI({
			article_id: id,
			page: commentListPage,
			limit: COMMENT_PAGE_SIZE,
		}).then((res) => {
			if (res.success) {
				const { rows, count, total } = res.data;

				setState({
					commentList: isRefresh ? rows : [...commentList, ...rows],
					commentListTotal: count,
					total,
				});

				if (isRefresh) {
					setState({ commentListPage: 1 });
				}
			}
		});
	};

	const sendComment = (params, finishCallback) => {
		commentArticleAPI(params)
			.then((res) => {
				if (res.success) {
					setState({ commentContent: "" });
					if (params.parent_id || params.top_id) {
						updateParentComment(params.top_id, id);
					} else {
						getCommentList(true);
					}
				}
			})
			.finally(() => {
				typeof finishCallback === "function" && finishCallback();
			});
	};

	const updateParentComment = (id, article_id) => {
		getRelatedCommentAPI(id, article_id).then((res) => {
			if (res.success) {
				// setState({ commentList: res.data });
				const newCommentList = updateCommentTree(
					commentList,
					id,
					(comment) => ({
						...comment,
						children: res.data,
					}),
				);

				setState({ commentList: newCommentList });
			}
		});
	};

	const likeComment = (id) => {
		likeCommentAPI(id).then((res) => {
			if (res.success) {
				const newCommentList = updateCommentTree(
					commentList,
					id,
					(comment) => ({
						...comment,
						isLiked: true,
						like_count: comment.like_count + 1,
					}),
				);

				setState({ commentList: newCommentList });
			}
		});
	};

	const unLikeComment = (id) => {
		unLikeCommentAPI(id).then((res) => {
			if (res.success) {
				const newCommentList = updateCommentTree(
					commentList,
					id,
					(comment) => ({
						...comment,
						isLiked: false,
						like_count: comment.like_count - 1,
					}),
				);

				setState({ commentList: newCommentList });
			}
		});
	};

	const deleteComment = (id) => {
		deleteCommentAPI(id).then((res) => {
			if (res.success) {
				const newCommentList = deleteCommentById(commentList, id);
				setState({ commentList: newCommentList });
			}
		});
	};

	return (
		<ArticleViewStyle>
			<Spin tip="加载中..." spinning={loading}>
				<div className="article-info cyc_card">
					<div className="article-info-header">
						<h1 className="article-info-header-title">
							{articleDetail.title}
						</h1>
						<div className="article-info-header-info">
							<NavLink
								className="info-author cyc_click_link"
								to={`/user/${articleDetail.User?.id}`}
							>
								{articleDetail.User?.nickname}
							</NavLink>
							<div className="info-createTime">
								<i
									className="iconfont icon-shijian"
									style={{ marginBottom: 1 }}
								/>
								<span>
									{handleFormatTime(articleDetail.updated_at)}
								</span>
							</div>
							<div className="info-viewCount">
								<i
									className="iconfont icon-chakan"
									style={{ fontSize: 20, marginTop: 1 }}
								/>
								<span>{articleDetail.view_count}</span>
							</div>
						</div>
					</div>
					<div className="article-info-main">
						<MarkdownPreview value={articleDetail.content} />
					</div>
				</div>
				<div className="article-comment cyc_card">
					<div className="article-comment-header">评论 {total}</div>
					<div className="article-comment-action">
						<div className="action-left">
							<img
								src={handleAvatar(userInfo.avatar)}
								alt="头像"
								className="avatar"
							/>
						</div>
						<div
							className="action-right"
							style={{
								borderColor: isFocus ? "#1677ff" : "#d9d9d9",
								boxShadow: isFocus
									? "0 0 0 2px rgba(5, 145, 255, 0.1)"
									: "none",
							}}
						>
							<Input.TextArea
								placeholder={
									token ? "说点什么..." : "登录后评论"
								}
								maxLength={1000}
								autoSize={{
									minRows: isFocus ? 4 : 2,
									maxRows: isFocus ? 6 : 2,
								}}
								style={{ resize: "none" }}
								onFocus={() => setState({ isFocus: true })}
								onBlur={() => setState({ isFocus: false })}
								onChange={(e) =>
									setState({ commentContent: e.target.value })
								}
								value={commentContent}
								onKeyDown={(e) => {
									if (e.ctrlKey && e.key === "Enter") {
										if (!commentContent.trim().length)
											return;
										e.preventDefault();
										sendComment({
											article_id: id,
											content: commentContent,
										});
									}
								}}
							/>
							<div className="action-right-footer">
								<div className="font-length">
									{commentContent.length} / 1000
								</div>
								<Tooltip title="ctrl + enter 发送">
									<Button
										type="primary"
										className="send-btn"
										autoInsertSpace={false}
										disabled={!commentContent.trim().length}
										onClick={() =>
											sendComment(
												{
													article_id: id,
													content: commentContent,
												},
												() =>
													setState({
														sendCommentLoading: false,
													}),
											)
										}
									>
										{sendCommentLoading
											? "发送中..."
											: "发送"}
									</Button>
								</Tooltip>
							</div>
						</div>
					</div>
					<div className="article-comment-main">
						{commentList?.length ? (
							commentList.map((comment) => (
								<CommentItem
									key={comment.id}
									comment={comment}
									likeComment={likeComment}
									unLikeComment={unLikeComment}
									token={token}
									sendComment={sendComment}
									deleteComment={deleteComment}
									userInfo={userInfo}
									article_id={id}
								>
									{(comment.children || []).map(
										(childrenComment) => (
											<CommentItem
												key={childrenComment.id}
												comment={childrenComment}
												likeComment={likeComment}
												unLikeComment={unLikeComment}
												token={token}
												sendComment={sendComment}
												deleteComment={deleteComment}
												userInfo={userInfo}
												article_id={id}
											/>
										),
									)}
								</CommentItem>
							))
						) : (
							<Empty
								description="暂无评论，快来抢沙发吧！"
								image={Empty.PRESENTED_IMAGE_SIMPLE}
							/>
						)}
					</div>
				</div>
			</Spin>
		</ArticleViewStyle>
	);
};

export default ArticleView;
