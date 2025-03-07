import { useEffect, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Empty, Popover, Modal, message, Skeleton, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";

import { getArticleListAPI, deleteArticleAPI } from "@/apis/article";
import { formatTime } from "@/utils";

import { DraftListStyle } from "./style";

const DEFAULT_LIMIT = 20;

const initialState = {
	draftList: [],
	loading: false,
	page: 1,
	limit: DEFAULT_LIMIT,
	total: 0,
};

const DraftList = ({ user_id }) => {
	const [state, setState] = useSetState(initialState);
	const { draftList, loading, page, limit, total } = state;

	const loadingRef = useRef(null);

	const hasMore = useMemo(() => total > draftList.length, [total, draftList]);

	useEffect(() => {
		getDraftList();
	}, [page]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					setState({ page: page + 1 });
				}
			},
			{ threshold: 0 },
		);

		if (loadingRef.current) {
			observer.observe(loadingRef.current);
		}

		return () => {
			if (loadingRef.current) {
				observer.unobserve(loadingRef.current);
			}
		};
	}, [hasMore, loading]);

	const getDraftList = () => {
		setState({ loading: true });
		getArticleListAPI({
			user_id,
			status: "draft",
			page,
			limit,
		})
			.then((res) => {
				if (res.success) {
					setState({
						draftList:
							page === 1
								? res.data.rows
								: [...draftList, ...res.data.rows],
						total: res.data.count,
					});
				}
			})
			.finally(() => {
				setState({ loading: false });
			});
	};

	const deleteDraft = (id) => {
		Modal.confirm({
			title: "提示",
			content: "确定删除该草稿吗？",
			okText: "确定",
			cancelText: "取消",
			onOk: () => {
				deleteArticleAPI(id).then((res) => {
					if (res.success) {
						const beforePage = page;
						if (beforePage === 1) {
							getDraftList();
						} else {
							setState({ page: 1 });
						}
						message.success("删除成功");
					}
				});
			},
		});
	};

	return (
		<DraftListStyle>
			<ul className="draft-list">
				{loading && page === 1 ? (
					<div className="entry-skeleton">
						<Skeleton active />
					</div>
				) : draftList?.length > 0 ? (
					<>
						{draftList.map((item) => (
							<li key={item.id} className="draft-item">
								<div className="draft-item-wrapper">
									<NavLink
										to={`/edit-article/${item.id}`}
										className="draft-item-title cyc_ellipsis cyc_click_link"
									>
										{item.title || "未设置标题文章"}
									</NavLink>
									<div className="draft-item-footer">
										<div className="time">
											{formatTime(item.updated_at)}
										</div>
										<div className="more">
											<Popover
												content={
													<div className="more-content">
														<NavLink
															to={`/edit-article/${item.id}`}
															className="edit"
														>
															编辑
														</NavLink>
														<div
															className="delete"
															onClick={() =>
																deleteDraft(
																	item.id,
																)
															}
														>
															删除
														</div>
													</div>
												}
												trigger="click"
												placement="bottom"
												getPopupContainer={(
													triggerNode,
												) => triggerNode.parentElement}
											>
												<EllipsisOutlined />
											</Popover>
										</div>
									</div>
								</div>
							</li>
						))}
						{hasMore && !loading && (
							<div ref={loadingRef}>
								<Spin
									tip="加载中..."
									wrapperClassName="loading-spin"
								>
									<></>
								</Spin>
							</div>
						)}
					</>
				) : (
					<Empty
						description="这里什么也没有"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						style={{ padding: 100, margin: 0 }}
					/>
				)}
			</ul>
		</DraftListStyle>
	);
};

export default DraftList;
