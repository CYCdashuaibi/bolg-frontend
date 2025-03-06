import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetState } from "ahooks";

import { getUserInfoAPI } from "@/apis/user";

import { UserInfoStyle } from "./style";

const initialState = {
	userInfo: {},
	loading: true,
};

const UserInfo = () => {
	window.title = `的个人主页`;

	const { id } = useParams();

	const [state, setState] = useSetState(initialState);
	const { userInfo, loading } = state;

	useEffect(() => {
		if (!id) return;
		getUserInfoAPI(id).then((res) => {
			setState({ userInfo: res.data });
		});
	}, [id]);

	return (
		<UserInfoStyle>
			<div className="user-info-header">
				<div className="user-info-header-avatar">
					<img src={userInfo.avatar} alt="avatar" />
				</div>
			</div>
		</UserInfoStyle>
	);
};

export default UserInfo;
