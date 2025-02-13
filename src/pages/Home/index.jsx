import { useEffect } from "react";
import { Select } from "antd";
import { useSetState } from "ahooks";

import { getTagListAPI } from "@/apis/tag";

import Category from "./components/Category";

import { HomeStyle } from "./style";

const defaultTags = [{ name: "全部" }];

const initialState = {
	tags: [],
	activeTag: "全部",
};

function Home(props) {
	const [state, dispatch] = useSetState(initialState);

	const { activeTag, tags } = state;

	useEffect(() => {
		getTagListAPI().then((res) => {
			if (res.success) {
				dispatch({ tags: [...defaultTags, ...res.data] });
			}
		});
	}, []);

	return (
		<HomeStyle>
			<div className="home_left">
				<Category />
			</div>
			<div className="home_center cyc_card">
				<header className="list-header">
					<div></div>
					<Select
						showSearch
						optionFilterProp="label"
						style={{ width: 200, background: "#f2f3f5" }}
						value={activeTag}
						onChange={(value) => dispatch({ activeTag: value })}
						options={tags.map((item) => ({
							label: item.name,
							value: item.name,
						}))}
					/>
				</header>
				<ul className="entry-list">
					{Array.from({ length: 20 }).map((_, index) => (
						<li className="entry" key={index}>
							<div className="content-wrapper">
								<div className="content-main">
									<div className="title-row">
										<a
											href="#"
											className="title cyc_ellipsis"
											target="_blank"
											title="VitePress 为路由切换增加动画效果"
										>
											VitePress 为路由切换增加动画效果
										</a>
									</div>
									<div className="abstract-row">
										<a
											href="#"
											className="abstract cyc_ellipsis"
											target="_blank"
										>
											在 vitepress
											中，文档的切换非常迅速，以至于我们如果注意力不集中很容易没有发现文档切换了，聪明的我们还以为点击链接没有效果或者卡住了
											为了解决这个问题，我们需要在路由切换时增加一些动画效果
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
													cyc
												</a>
												<div className="footer-divider" />
											</li>
											<li className="view item">
												<i className="iconfont icon-chakan" />
												<span>200</span>
											</li>
											<li className="like item cyc_click_link">
												<i className="iconfont icon-dianzan" />
												<span>200</span>
											</li>
										</ul>

										<ul className="entry-footer-tags">
											<li className="footer-tag">前端</li>
										</ul>
									</div>
								</div>
								<img
									src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/18dfa5d7bcd844b4a0b1ed92919cca78~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTW95dVdjYw==:q75.awebp?rk3s=f64ab15b&x-expires=1739515271&x-signature=%2FC2Sfcqhboz3S2v89%2Fudsc5AvcA%3D"
									alt=""
									className="content-img"
								/>
							</div>
						</li>
					))}
				</ul>
			</div>
		</HomeStyle>
	);
}

export default Home;
