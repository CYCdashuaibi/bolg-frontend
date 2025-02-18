import { useNavigate } from "react-router-dom";

import { WelcomeStyle } from "./style";

import avatar from "@/assets/images/avatar.jpeg";

const Welcome = () => {
	const navigate = useNavigate();

	return (
		<WelcomeStyle>
			<div className="welcome-content">
				<img src={avatar} alt="头像" className="avatar" />
				<p className="name">陈永超</p>
				<div className="line" style={{ width: 300 }} />
				<p className="desc">欢迎来到我的个人站</p>
				<div className="line" style={{ width: 100 }} />
				<button className="enter-btn" onClick={() => navigate("/cyc")}>
					进入
				</button>
				<ul className="menu">
					<li className="menu-item">关于我</li>
				</ul>
			</div>
		</WelcomeStyle>
	);
};

export default Welcome;
