import { useState, useEffect } from "react";
import { useSetState } from "ahooks";

import { getCategoryListAPI } from "@/apis/category";

import { CategoryStyle } from "./style";

const defaultCategorys = [
	{
		id: null,
		name: "全部",
		icon: "icon-xingzhuang",
	},
];

const initialState = {
	categorys: [],
	active: null,
};

function Category({ onChange }) {
	const [state, dispatch] = useSetState(initialState);

	const { categorys, active } = state;

	useEffect(() => {
		getCategoryListAPI().then((res) => {
			if (res.success) {
				dispatch({ categorys: [...defaultCategorys, ...res.data] });
			}
		});
	}, []);

	return (
		<CategoryStyle>
			<div className="nav-item-list cyc_card">
				{categorys.map((item) => (
					<a
						className={`nav-item-wrap ${
							active === item.id && "active"
						}`}
						key={item.name}
						onClick={() => {
							dispatch({ active: item.id });
							onChange?.(item.id);
						}}
					>
						<i className={`iconfont ${item.icon}`} />
						<span className="nav-item-text">{item.name}</span>
					</a>
				))}
			</div>
		</CategoryStyle>
	);
}

export default Category;
