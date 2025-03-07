import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Spin, Button } from "antd";
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
};

const UserInfo = () => {
	const { id, tab } = useParams();

	const [state, setState] = useSetState(initialState);
	const { userInfo, userInfoLoading } = state;

	const navigate = useNavigate();

	const tabsActiveKey = tab || "1";

	const { userInfo: userInfoStore } = useSelector((state) => state.user);

	const tabs = useMemo(() => {
		if (userInfoStore.id === Number(id)) {
			return TABS;
		}

		return TABS.filter((tab) => tab.key !== "2");
	}, [userInfoStore]);

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
					<div className="header-left">
						<div className="header-avatar">
							<img
								src={handleAvatar(userInfo.avatar)}
								alt="avatar"
							/>
						</div>
						<div className="header-info">
							<div className="header-info-nickname">
								{userInfo.nickname}
							</div>
						</div>
					</div>
					<div className="header-right">
						<Button
							color="primary"
							variant="outlined"
							className="setting-btn"
							onClick={() => navigate(`/cyc/profile`)}
						>
							设置
						</Button>
					</div>
				</div>
			</Spin>

			<div className="main">
				<div className="main-tabs">
					<Tabs
						activeKey={tabsActiveKey}
						items={tabs}
						onChange={(key) => navigate(`/cyc/user/${id}/${key}`)}
					/>
				</div>

				{tabsActiveKey === "1" && <ArticleList user_id={id} />}
				{tabsActiveKey === "2" && <DraftList user_id={id} />}
			</div>
		</UserInfoStyle>
	);
};

export default UserInfo;
