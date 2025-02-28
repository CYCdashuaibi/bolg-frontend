import { useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Select, Empty, Spin } from "antd";
import { useSetState } from "ahooks";

import { getTagListAPI } from "@/apis/tag";
import { getArticleListAPI } from "@/apis/article";

import { handleInsertValue } from "@/utils";

import Category from "./components/Category";

import { HomeStyle } from "./style";

const defaultTags = [{ name: "全部" }];

const DEFAULT_LIMIT = 20;

const initialState = {
	tags: [],
	activeTag: "全部",
	category: null,
	articleList: [],
	page: 1,
	limit: DEFAULT_LIMIT,
	loading: false,
	total: 0,
};

function Home(props) {
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
												<a
													href="#"
													className="title cyc_ellipsis"
													target="_blank"
													title={item.title}
												>
													{item.title}
												</a>
											</div>
											<div className="abstract-row">
												<a
													href="#"
													className="abstract cyc_ellipsis"
													target="_blank"
												>
													{item.summary}
												</a>
											</div>
											<div className="entry-footer">
												<ul className="action-list">
													<li className="user-message item cyc_click_link">
														<a
															href="#"
															className="username"
															target="_blank"
														>
															{item.User.nickname}
														</a>
														<div className="footer-divider" />
													</li>
													<li className="view item">
														<i className="iconfont icon-chakan" />
														<span>
															{item.view_count}
														</span>
													</li>
													<li className="like item cyc_click_link">
														<i className="iconfont icon-dianzan" />
														<span>
															{item.like_count}
														</span>
													</li>
												</ul>

												<ul className="entry-footer-tags">
													{item.Tags.map((tag) => (
														<li className="footer-tag" key={tag.id}>
															{tag.name}
														</li>
													))}
												</ul>
											</div>
										</div>
										<img
											src={handleInsertValue(
												item.cover_image,
											)}
											alt=""
											className="content-img"
										/>
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
