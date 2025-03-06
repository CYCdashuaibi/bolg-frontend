import { useState, useRef } from "react";
import {
	Avatar,
	Typography,
	Input,
	Button,
	message,
	Tooltip,
	Popover,
	Popconfirm,
} from "antd";
import { Comment } from "@ant-design/compatible";
import { useSetState } from "ahooks";

import { handleFormatTime, handleAvatar } from "@/utils";

import { commentArticleAPI } from "@/apis/article";

import "./index.scss";
import { ReplyStyle, CommentActionsStyle } from "./style";

const initialState = {
	isFocus: false,
	replyContent: "",
	replyVisible: false,
	sendCommentLoading: false,
};

const CommentItem = (props) => {
	const {
		children,
		comment,
		likeComment,
		unLikeComment,
		handleReplyComment,
		sendComment,
		deleteComment,
		userInfo,
		article_id,
		token,
	} = props;

	const parentCommentId = useRef(null);
	const replyBoxRef = useRef(null);

	const [state, setState] = useSetState(initialState);
	const { isFocus, replyContent, replyVisible, sendCommentLoading } = state;

	const handleReply = () => {
		if (!token) {
			message.warning("请先登录");
			return;
		}

		setState({ sendCommentLoading: true });
		sendComment(
			{
				article_id,
				content: replyContent,
				parent_id: parentCommentId.current,
				top_id: comment.topId,
			},
			() => {
				setState({
					sendCommentLoading: false,
					replyContent: "",
					replyVisible: false,
				});
			},
		);
	};

	const handleBlur = (e) => {
		// 检查点击的目标是否在回复框内
		if (
			replyBoxRef.current &&
			!replyBoxRef.current.contains(e.relatedTarget)
		) {
			setState({ isFocus: false, replyVisible: false });
		}
	};

	return (
		<Comment
			key={comment.id}
			author={
				<>
					<Typography.Link>{comment.User?.nickname}</Typography.Link>
					{comment.parent?.id &&
						comment.parent?.id !== comment.topId && (
							<>
								<span
									style={{
										margin: "0 4px",
										color: "#252933",
									}}
								>
									回复
								</span>
								<Typography.Link>
									{comment.parent?.User?.nickname}
								</Typography.Link>
							</>
						)}
				</>
			}
			avatar={<Avatar src={handleAvatar(comment.User?.avatar)} />}
			content={comment.content}
			datetime={handleFormatTime(comment.created_at)}
			actions={[
				<CommentActionsStyle>
					<div className="actions-left">
						<div key="like" className="like">
							{comment.isLiked ? (
								<i
									className="iconfont icon-dianzan1"
									style={{
										color: "#1171ee",
									}}
									onClick={() => unLikeComment(comment.id)}
								/>
							) : (
								<i
									className="iconfont icon-dianzan"
									onClick={() => likeComment(comment.id)}
								/>
							)}
							<span>{comment.like_count}</span>
						</div>
						<div
							className="cyc_click_link reply"
							key="reply"
							onClick={() => {
								if (!token) {
									message.warning("请先登录");
									return;
								}
								setState({ replyVisible: true, isFocus: true });
								parentCommentId.current = comment.id;
							}}
							style={{
								color: replyVisible ? "#1171ee" : "",
							}}
						>
							<i className="iconfont icon-pinglun" />
							<span>评论</span>
						</div>
					</div>
					<div className="actions-right">
						{(userInfo.id === comment.User.id ||
							userInfo.role === "admin") && (
							<Popconfirm
								title="确定删除该评论吗？"
								onConfirm={() => deleteComment(comment.id)}
								okText="确定"
								cancelText="取消"
							>
								<Button type="link" className="delete-btn">
									<i className="iconfont icon-shanchu" />
								</Button>
							</Popconfirm>
						)}
					</div>
				</CommentActionsStyle>,
			]}
		>
			{replyVisible && (
				<ReplyStyle $isFocus={isFocus} ref={replyBoxRef} tabIndex={-1}>
					<Input.TextArea
						placeholder="回复"
						maxLength={1000}
						autoSize={{
							minRows: 2,
							maxRows: 2,
						}}
						style={{ resize: "none" }}
						onBlur={handleBlur}
						onChange={(e) =>
							setState({ replyContent: e.target.value })
						}
						value={replyContent}
						autoFocus={true}
						onKeyDown={(e) => {
							if (e.ctrlKey && e.key === "Enter") {
								if (!replyContent.trim().length) return;
								e.preventDefault();
								handleReply();
							}
						}}
					/>
					<div className="footer">
						<div className="font-length">
							{replyContent.length} / 1000
						</div>
						<Tooltip title="ctrl + enter 发送">
							<Button
								type="primary"
								className="send-btn"
								autoInsertSpace={false}
								disabled={!replyContent.trim().length}
								onClick={handleReply}
								loading={sendCommentLoading}
							>
								{sendCommentLoading ? "发送中..." : "回复"}
							</Button>
						</Tooltip>
					</div>
				</ReplyStyle>
			)}
			{children}
		</Comment>
	);
};

export default CommentItem;
