import { useEffect, useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, message, Empty } from "antd";
import { useSetState } from "ahooks";

import {
	getArticleListAPI,
	likeArticleAPI,
	unLikeArticleAPI,
} from "@/apis/article";
import { handleInsertValue, formatTime } from "@/utils";

import { ArticleListStyle } from "./style";

const DEFAULT_LIMIT = 20;

const initialState = {
	articleList: [],
	loading: false,
	page: 1,
	limit: DEFAULT_LIMIT,
	total: 0,
};

const ArticleList = ({ user_id }) => {
	const [state, dispatch] = useSetState(initialState);
	const { articleList, loading, page, limit, total } = state;

	const { token } = useSelector((state) => state.user);

	const loadingRef = useRef(null);

	const hasMore = useMemo(
		() => total > articleList.length,
		[total, articleList],
	);

	useEffect(() => {
		getArticleList();
	}, [page]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					dispatch({ page: page + 1 });
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

	const getArticleList = () => {
		dispatch({ loading: true });
		getArticleListAPI({
			user_id,
			page,
			limit,
		})
			.then((res) => {
				if (res.success) {
					dispatch({
						articleList: [...articleList, ...res.data.rows],
						total: res.data.count,
					});
				}
			})
			.finally(() => {
				dispatch({ loading: false });
			});
	};

	// 点赞文章
	const likeArticle = (id) => {
		if (!token) {
			message.warning("请先登录");
			return;
		}
		likeArticleAPI(id).then((res) => {
			if (res.success) {
				dispatch({
					articleList: articleList.map((item) => {
						if (item.id === id) {
							return {
								...item,
								like_count: item.like_count + 1,
								isLiked: true,
							};
						}
						return item;
					}),
				});
			}
		});
	};

	// 取消点赞文章
	const unLikeArticle = (id) => {
		if (!token) {
			message.warning("请先登录");
			return;
		}
		unLikeArticleAPI(id).then((res) => {
			if (res.success) {
				dispatch({
					articleList: articleList.map((item) => {
						if (item.id === id) {
							return {
								...item,
								like_count: item.like_count - 1,
								isLiked: false,
							};
						}
						return item;
					}),
				});
			}
		});
	};

	return (
		<ArticleListStyle>
			<ul className="entry-list">
				{articleList?.length > 0 ? (
					<>
						{articleList.map((item) => (
							<li key={item.id} className="entry">
								<div className="content-wrapper">
									<div className="content-main">
										<div className="title-row">
											<NavLink
												to={`/cyc/article-view/${item.id}`}
												className="title cyc_ellipsis"
												target="_blank"
												title={item.title}
											>
												{item.title}
											</NavLink>
										</div>
										<div className="abstract-row">
											<NavLink
												to={`/cyc/article-view/${item.id}`}
												className="abstract cyc_ellipsis"
												target="_blank"
											>
												{item.summary}
											</NavLink>
										</div>
										<div className="entry-footer">
											<ul className="action-list">
												<li className="time item">
													<span>
														{formatTime(
															item.created_at,
														)}
													</span>
													<div className="footer-divider" />
												</li>
												<li className="view item">
													<i className="iconfont icon-chakan" />
													<span>
														{item.view_count}
													</span>
												</li>
												<li className="like item cyc_click_link">
													{item.isLiked ? (
														<i
															className="iconfont icon-dianzan1"
															style={{
																color: "#1171ee",
															}}
															onClick={() =>
																unLikeArticle(
																	item.id,
																)
															}
														/>
													) : (
														<i
															className="iconfont icon-dianzan"
															onClick={() =>
																likeArticle(
																	item.id,
																)
															}
														/>
													)}
													<span>
														{item.like_count}
													</span>
												</li>
											</ul>

											<ul className="entry-footer-tags">
												{item.Tags.map((tag) => (
													<li
														className="footer-tag"
														key={tag.id}
													>
														{tag.name}
													</li>
												))}
											</ul>
										</div>
									</div>
									{item.cover_image && (
										<img
											src={handleInsertValue(
												item.cover_image,
											)}
											alt=""
											className="content-img"
										/>
									)}
								</div>
							</li>
						))}
						{hasMore && !loading && (
							<Spin
								tip="加载中..."
								wrapperClassName="loading-spin"
								ref={loadingRef}
							>
								<></>
							</Spin>
						)}
					</>
				) : (
					<Empty
						description="这里什么都没有"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						style={{ paddingTop: 100 }}
					/>
				)}
			</ul>
		</ArticleListStyle>
	);
};

export default ArticleList;
