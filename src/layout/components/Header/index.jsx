import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Popover, Popconfirm } from "antd";
import { PlusCircleOutlined, LogoutOutlined } from "@ant-design/icons";

import { getToken } from "@/utils";
import { fetchLogout } from "@/store/modules/user";

import { menuList } from "./contants";

import { HeaderStyle } from "./style";

import Logo from "@/assets/react.svg";
import Avatar from "@/assets/images/avatar.jpeg";
import DefaultAvatar from "@/assets/images/default_avatar.png";

function Header() {
	const location = useLocation();
	const { pathname } = location;

	const dispatch = useDispatch();
	const { userInfo, token } = useSelector((state) => state.user);

	const logout = () => {
		dispatch(fetchLogout());
	};

	return (
		<HeaderStyle>
			<div className="container">
				<NavLink href="/home" className="logo">
					<img src={Logo} alt="logo" className="logo" />
				</NavLink>
				<nav className="header-nav">
					<ul className="nav-list">
						<li className="nav-list-menu">
							{menuList.map((menu) => (
								<NavLink
									href={menu.path}
									key={menu.path}
									className={`nav-list-menu-item ${
										pathname === menu.path && "active"
									}`}
								>
									{menu.name}
								</NavLink>
							))}
						</li>
						<ul className="nav-list-right">
							<li className="search">
								<Input.Search
									placeholder="搜索"
									enterButton
									style={{ width: 300 }}
								/>
							</li>
							<li className="add">
								<Button type="primary">
									<PlusCircleOutlined />
									写文章
								</Button>
							</li>
							<li>
								{token ? (
									<Popover
										placement="bottom"
										content={
											<div
												className="logout-content cyc_click_link"
												onClick={logout}
											>
												<LogoutOutlined /> 退出登录
											</div>
										}
									>
										<img
											src={
												userInfo.avatar || DefaultAvatar
											}
											alt="头像"
											className="avatar"
										/>
									</Popover>
								) : (
									<div className="login-content">
										<NavLink to="/login" className="login-btn">登录</NavLink>
                                        <div className="bar" />
										<NavLink to="/register" className="register-btn">注册</NavLink>
									</div>
								)}
							</li>
						</ul>
					</ul>
				</nav>
			</div>
		</HeaderStyle>
	);
}

export default Header;
