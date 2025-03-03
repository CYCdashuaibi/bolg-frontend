/**
 * @fileoverview 查阅文章
 */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Typography, Avatar, Input, Button } from "antd";
import { Comment } from "@ant-design/compatible";
import { UserOutlined } from "@ant-design/icons";
import { useParams, NavLink } from "react-router-dom";
import { useSetState } from "ahooks";

import { getArticleDetailAPI } from "@/apis/article";
import { handleFormatTime, handleInsertValue } from "@/utils";

import { MarkdownPreview } from "@/components";

import { ArticleViewStyle } from "./style";

import DefaultAvatar from "@/assets/images/default_avatar.png";

const initialState = {
	articleDetail: {},
	loading: true,
	isFocus: false,
	commentContent: "",
};

const ArticleView = () => {
	const { id } = useParams();
	const [state, setState] = useSetState(initialState);
	const { articleDetail, loading, isFocus, commentContent } = state;

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		getArticleDetail();
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
								<i className="iconfont icon-shijian" style={{ marginBottom: 1 }} />
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
					<div className="article-comment-header">评论 188</div>
					<div className="article-comment-action">
						<div className="action-left">
							<img
								src={
									userInfo.avatar
										? handleInsertValue(userInfo.avatar)
										: DefaultAvatar
								}
								alt="头像"
								className="avatar"
							/>
						</div>
						<div className="action-right" style={{ borderColor: isFocus ? '#1677ff' : '#d9d9d9', boxShadow: isFocus ? '0 0 0 2px rgba(5, 145, 255, 0.1)' : 'none' }}>
                            <Input.TextArea
                                placeholder="说点什么..."
                                maxLength={1000}
                                autoSize={{
                                    minRows: isFocus ? 4 : 2,
                                    maxRows: isFocus ? 6 : 2,
                                }}
                                style={{ resize: "none" }}
                                onFocus={() => setState({ isFocus: true })}
                                onBlur={() => setState({ isFocus: false })}
                                onChange={(e) => setState({ commentContent: e.target.value })}
                                value={commentContent}
                            />
                            <div className="action-right-footer">
                                <div className="font-length">
                                    {commentContent.length} / 1000
                                </div>
                                <Button type="primary" className="send-btn" autoInsertSpace={false} disabled={!commentContent.trim().length}>
                                    发送
                                </Button>
                            </div>
						</div>
					</div>
					<div className="article-comment-main">
						<Comment
							author={<Typography.Link>张三</Typography.Link>}
							avatar={<Avatar icon={<UserOutlined />} />}
							content="这是一个示例评论内容，Ant Design 的 Comment 组件非常实用！"
							datetime="2023-10-20 10:00"
							actions={[
								<span key="like">👍 12</span>,
								<span key="reply">💬 回复</span>,
							]}
						>
							<Comment
								author="李四"
								avatar={
									<Avatar src="https://example.com/avatar.png" />
								}
								content="这是嵌套的回复内容。"
								datetime="2023-10-20 10:30"
							/>
						</Comment>
					</div>
				</div>
			</Spin>
		</ArticleViewStyle>
	);
};

export default ArticleView;
