import { useState, useEffect, useRef } from "react";
import {
	NavLink,
	useNavigate,
	useLocation,
	useSearchParams,
} from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useSetState } from "ahooks";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { sendCodeAPI, verifyCodeAPI, registerAPI } from "@/apis/user";
import { emailRegex, encryptData, decryptData } from "@/utils";

import { RegisterStyle } from "./style";

const initialState = {
	getCodeLoading: false,
	registerLoading: false,
	codeDelay: 0,
	email: undefined,
};

const Register = () => {
	window.document.title = "注册";

	const [form] = Form.useForm();
	const [state, dispatch] = useSetState(initialState);
	const { getCodeLoading, registerLoading, codeDelay, email } = state;

	const intervalRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		// 解析最新的搜索参数
		const searchParams = new URLSearchParams(location.search);
		analysisSearchParams(searchParams);
	}, [location.search]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const analysisSearchParams = (searchParams) => {
		const encryptedEmail = searchParams.get("email");
		if (encryptedEmail) {
			try {
				const decodedEncryptedEmail =
					decodeURIComponent(encryptedEmail);

				const email = decryptData(decodedEncryptedEmail);
				if (email) {
					dispatch({ email });
				}
			} catch (err) {
				console.error("邮箱参数解析失败:", err);
				message.error("邮箱信息失效，请重新获取");
				navigate("/register");
			}
		} else {
			dispatch({ email: undefined });
		}
	};

	const onNext = (values) => {
		verifyCodeAPI(values)
			.then((res) => {
				if (res.success) {
					const encryptedEmail = encryptData(values.email);

					navigate(
						`/register?email=${encodeURIComponent(encryptedEmail)}`,
					);
				}
			})
			.finally(() => {
				dispatch({ registerLoading: false });
			});
	};

	const onFinish = (values) => {
		const params = {
			username: values.username,
			password: encryptData(values.password),
			email: email,
		};
		registerAPI(params)
			.then((res) => {
				if (res.success) {
					message.success("注册成功");
					navigate("/login");
				}
			})
			.finally(() => {
				dispatch({ registerLoading: false });
			});
	};

	const onGetCode = () => {
		form.validateFields(["email"]).then(() => {
			dispatch({ getCodeLoading: true });
			const values = form.getFieldsValue();

			sendCodeAPI(values)
				.then((res) => {
					if (res.success) {
						message.success(res.message || "验证码发送成功");
						startCountdown();
					}
				})
				.finally(() => {
					dispatch({ getCodeLoading: false });
				});
		});
	};

	const startCountdown = () => {
		let seconds = 60; // 设置倒计时的秒数
		dispatch({ codeDelay: seconds });
		intervalRef.current = setInterval(() => {
			seconds -= 1;
			dispatch({ codeDelay: seconds });
			if (seconds <= 0) {
				clearInterval(intervalRef.current);
				dispatch({ codeDelay: 0 });
			}
		}, 1000);
	};

	return (
		<RegisterStyle>
			<div className="register-card">
				<h3 className="title">注册</h3>
				<Form
					form={form}
					name="register"
					wrapperCol={{
						span: 24,
					}}
					onFinish={email ? onFinish : onNext}
					autoComplete="off"
					className="register-form"
				>
					{email ? (
						// 设置密码表单
						<>
							<div className="email-info">
								您注册的邮箱为 {email}
							</div>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "请输入用户名",
									},
								]}
							>
								<Input
									prefix={
										<UserOutlined
											style={{ fontSize: 18 }}
										/>
									}
									placeholder="用户名"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "请输入密码",
									},
									{
										min: 6,
										message: "密码长度不能小于6位",
									},
								]}
							>
								<Input.Password
									prefix={
										<LockOutlined
											style={{ fontSize: 18 }}
										/>
									}
									placeholder="设置密码"
								/>
							</Form.Item>

							<Form.Item
								name="confirmPassword"
								rules={[
									{
										required: true,
										message: "请输入确认密码",
									},
									{
										min: 6,
										message: "密码长度不能小于6位",
									},
									{
										validator: (_, value) =>
											value &&
											value !==
												form.getFieldValue("password")
												? Promise.reject(
														"两次密码不一致",
												  )
												: Promise.resolve(),
									},
								]}
								style={{ marginBottom: 0 }}
							>
								<Input.Password
									prefix={
										<LockOutlined
											style={{ fontSize: 18 }}
										/>
									}
									placeholder="再次确认密码"
								/>
							</Form.Item>

							<Form.Item style={{ marginTop: 28 }}>
								<Button
									type="primary"
									htmlType="submit"
									className="register-form-button"
									loading={registerLoading}
								>
									注册
								</Button>
							</Form.Item>
						</>
					) : (
						// 验证码表单
						<>
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
											style={{ fontSize: 20 }}
										/>
									}
									placeholder="邮箱"
								/>
							</Form.Item>

							<Form.Item
								name="code"
								rules={[
									{
										required: true,
										message: "请输入验证码",
									},
								]}
								style={{ marginBottom: 0 }}
							>
								<Input
									prefix={
										<i
											className="iconfont icon-yanzhengma"
											style={{ fontSize: 18 }}
										/>
									}
									placeholder="验证码"
									addonAfter={
										<Button
											color="primary"
											variant="link"
											disabled={codeDelay > 0}
											onClick={onGetCode}
											loading={getCodeLoading}
										>
											{codeDelay > 0
												? `重新发送 ${codeDelay}s`
												: "获取验证码"}
										</Button>
									}
								/>
							</Form.Item>

							<Form.Item style={{ marginTop: 28 }}>
								<Button
									type="primary"
									htmlType="submit"
									className="register-form-button"
									loading={registerLoading}
								>
									下一步
								</Button>
							</Form.Item>

							<NavLink to="/login" className="login">
								已有账号？去登陆
							</NavLink>
						</>
					)}
				</Form>
			</div>
		</RegisterStyle>
	);
};

export default Register;
