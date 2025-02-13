import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from "antd";
import { emailRegex, encryptData } from "@/utils";

import { fetchLogin } from "@/store/modules/user";

import { LoginStyle } from "./style";

const Login = () => {
	const dispatch = useDispatch();

	const onFinish = (values) => {
		const params = {
			email: values.email,
			password: encryptData(values.password),
		};

		dispatch(fetchLogin(params));
	};

	return (
		<LoginStyle>
			<div className="login-card">
				<h3 className="title">登录</h3>
				<Form
					name="login"
					wrapperCol={{
						span: 24,
					}}
					onFinish={onFinish}
					autoComplete="off"
					className="login-form"
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "请输入邮箱",
							},
							{
								pattern: emailRegex,
								message: "请输入有效的邮箱地址",
							},
						]}
					>
						<Input
							prefix={
								<i
									className="iconfont icon-youxiang"
									style={{ fontSize: 19 }}
								/>
							}
							placeholder="邮箱"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "请输入密码",
							},
						]}
						style={{ marginBottom: 0 }}
					>
						<Input.Password
							prefix={
								<i
									className="iconfont icon-suo"
									style={{ fontSize: 19 }}
								/>
							}
							placeholder="密码"
						/>
					</Form.Item>

					<NavLink to="/forget" className="forget-password">
						忘记密码？
					</NavLink>

					<Form.Item style={{ marginTop: 28 }}>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							登录
						</Button>
					</Form.Item>

					<NavLink to="/register" className="register">
						还没有账号？立即注册
					</NavLink>
				</Form>
			</div>
		</LoginStyle>
	);
};

export default Login;
