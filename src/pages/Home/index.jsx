import { useEffect, useRef, useMemo } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, Empty, Spin, Skeleton } from "antd";
import { useSetState } from "ahooks";

import { getTagListAPI } from "@/apis/tag";
import {
	getArticleListAPI,
	likeArticleAPI,
	unLikeArticleAPI,
} from "@/apis/article";

import { handleInsertValue } from "@/utils";

import Category from "./components/Category";

import { HomeStyle } from "./style";

const defaultTags = [{ id: 0, name: "全部" }];

const DEFAULT_LIMIT = 20;
const DEFAULT_TAG = 0;

const initialState = {
	tags: [],
	activeTag: DEFAULT_TAG,
	category: null,
	articleList: [],
	page: 1,
	limit: DEFAULT_LIMIT,
	loading: false,
	total: 0,
};

function Home(props) {
	window.document.title = "首页";
	const [state, dispatch] = useSetState(initialState);
	const {
		activeTag,
		category,
		tags,
		articleList,
		page,
		limit,
		loading,
		total,
	} = state;

	const { token } = useSelector((state) => state.user);

	const loadingRef = useRef(false);
	const isFirstRender = useRef(true);

	const [searchParams] = useSearchParams();
	const keyword = searchParams.get("search");

	const hasMore = useMemo(
		() => total > articleList.length,
		[total, articleList],
	);

	useEffect(() => {
		getTagListAPI().then((res) => {
			if (res.success) {
				dispatch({ tags: [...defaultTags, ...res.data] });
			}
		});
	}, []);

	useEffect(() => {
		if (isFirstRender.current) return;
		const beforePage = page;
		if (beforePage !== 1) {
			dispatch({ page: 1 });
		} else {
			getArticleList();
		}
	}, [category, activeTag, keyword]);

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

	// 获取文章列表
	const getArticleList = () => {
		isFirstRender.current = false;
		dispatch({ loading: true });
		getArticleListAPI({
			keyword,
			category,
			tags: activeTag ? [activeTag] : [],
			page,
			limit,
		})
			.then((res) => {
				if (res.success) {
					dispatch({
						articleList:
							page === 1
								? res.data.rows
								: [...articleList, ...res.data.rows],
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
		<HomeStyle>
			<div className="home_left">
				<Category
					onChange={(value) => {
						dispatch({
							category: value,
							page: 1,
							activeTag: DEFAULT_TAG,
						});
					}}
				/>
			</div>
			<div className="home_center cyc_card">
				<header className="list-header">
					<div></div>
					<Select
						showSearch
						optionFilterProp="label"
						style={{ width: 200, background: "#f2f3f5" }}
						value={activeTag}
						onChange={(value) =>
							dispatch({ activeTag: value, page: 1 })
						}
						options={tags.map((item) => ({
							label: item.name,
							value: item.id,
						}))}
					/>
				</header>
				<ul className="entry-list">
					{loading && page === 1 ? (
						<div className="entry-skeleton">
							<Skeleton active />
						</div>
					) : articleList?.length > 0 ? (
						<>
							{articleList.map((item) => (
								<li className="entry" key={item.id}>
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
													<li className="user-message item cyc_click_link">
														<NavLink
															to={`/cyc/user/${item.User.id}`}
															className="username"
															target="_blank"
														>
															{item.User.nickname}
														</NavLink>
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
							description="暂无数据"
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							style={{ paddingTop: 100, margin: 0 }}
						/>
					)}
				</ul>
			</div>
		</HomeStyle>
	);
}

export default Home;
