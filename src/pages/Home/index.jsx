import { useEffect, useRef, useMemo } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, Empty, Spin } from "antd";
import { useSetState } from "ahooks";

import { getTagListAPI } from "@/apis/tag";
import { getArticleListAPI, likeArticleAPI, unLikeArticleAPI } from "@/apis/article";

import { handleInsertValue } from "@/utils";

import Category from "./components/Category";

import { HomeStyle } from "./style";

const defaultTags = [{ name: "全部" }];

const DEFAULT_LIMIT = 20;

const initialState = {
	tags: [],
	activeTag: "全部",
	category: "全部",
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
		getArticleList();
	}, [category, activeTag, page, limit, keyword]);

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
		getArticleListAPI({
			keyword,
			category,
			tags: [activeTag],
			page,
			limit,
		}).then((res) => {
			if (res.success) {
				dispatch({ articleList: res.data.rows });
			}
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
						dispatch({ category: value, page: 1 });
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
							value: item.name,
						}))}
					/>
				</header>
				<ul className="entry-list">
					{articleList?.length > 0 ? (
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
															to={`/cyc/user-view/${item.User.id}`}
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
																style={{ color: "#1171ee" }}
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
							description="暂无数据"
							style={{ paddingTop: 100 }}
						/>
					)}
				</ul>
			</div>
		</HomeStyle>
	);
}

export default Home;
