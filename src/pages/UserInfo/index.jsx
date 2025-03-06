import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Spin } from "antd";
import { useSetState } from "ahooks";

import { getUserInfoAPI } from "@/apis/user";
import { handleAvatar } from "@/utils";

import { ArticleList, DraftList } from "./components";

import { UserInfoStyle } from "./style";

const TABS = [
	{
		key: "1",
		label: "文章",
	},
	{
		key: "2",
		label: "草稿",
	},
];

const initialState = {
	userInfo: {},
	userInfoLoading: true,
	tabsActiveKey: "1",
};

const UserInfo = () => {
	const { id } = useParams();

	const [state, setState] = useSetState(initialState);
	const { userInfo, userInfoLoading, tabsActiveKey } = state;

	useEffect(() => {
		if (!id) return;
		setState({ userInfoLoading: true });
		getUserInfoAPI(id)
			.then((res) => {
				setState({ userInfo: res.data });
				window.document.title = `${res.data.nickname} 的个人主页`;
			})
			.finally(() => {
				setState({ userInfoLoading: false });
			});
	}, [id]);

	return (
		<UserInfoStyle>
			<Spin spinning={userInfoLoading}>
				<div className="header cyc_card">
					<div className="header-avatar">
						<img src={handleAvatar(userInfo.avatar)} alt="avatar" />
					</div>
					<div className="header-info">
						<div className="header-info-nickname">
							{userInfo.nickname}
						</div>
					</div>
				</div>
			</Spin>

			<div className="main">
				<div className="main-tabs">
					<Tabs
						defaultActiveKey="1"
						items={TABS}
						onChange={(key) => setState({ tabsActiveKey: key })}
					/>
				</div>

				{tabsActiveKey === "1" && <ArticleList user_id={id} />}
				{tabsActiveKey === "2" && <DraftList user_id={id} />}
			</div>
		</UserInfoStyle>
	);
};

export default UserInfo;
