/**
 * @fileoverview 个人资料
 */
import { useEffect, useMemo } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { PlusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetState } from "ahooks";
import { LeftOutlined } from "@ant-design/icons";

import { updateUserInfoAPI } from "@/apis/user";
import { handleUpload, handleInsertValue, decryptData } from "@/utils";
import { setUserInfo, setToken } from "@/store/modules/user";

import { UpdatePasswordModel } from "./components";

import { ProfileStyle } from "./style";

const initialState = {
	avatar: null,
	nickname: "",
	updatePasswordVisible: false,
};

const Profile = () => {
	window.document.title = "个人资料";

	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [state, setState] = useSetState(initialState);
	const { avatar, nickname, updatePasswordVisible } = state;

	const { userInfo } = useSelector((state) => state.user);

	// 是否有修改
	const isModified = useMemo(() => {
		const beforeInfo = {
			nickname: userInfo.nickname,
			avatar: userInfo.avatar,
		};

		return (
			JSON.stringify(beforeInfo) !== JSON.stringify({ nickname, avatar })
		);
	}, [nickname, avatar, userInfo]);

	const handleCoverUpload = ({ file, onProgress, onSuccess, onError }) => {
		// 只能上传图片
		if (!file.type.startsWith("image/")) {
			message.error("只能上传图片");
			return false;
		}

		handleUpload([file], "article")
			.then((urls) => {
				setState({ avatar: urls[0] });
				onSuccess(urls[0]);
			})
			.catch((err) => {
				onError(err);
				message.error("上传失败", err);
			});
	};

	useEffect(() => {
		setState({ avatar: userInfo.avatar });

		form.setFieldsValue({
			nickname: userInfo.nickname,
			password: "********",
		});
		setState({ nickname: userInfo.nickname });
	}, [userInfo]);

	const updateInfo = (values) => {
		const { nickname } = values;
		updateUserInfoAPI({ nickname, avatar }).then((res) => {
			if (res.success) {
				dispatch(setUserInfo(decryptData(res.data.userInfo)));
				dispatch(setToken(res.data.token));
				message.success("修改成功");
			}
		});
	};

	return (
		<ProfileStyle>
			<div className="profile-header cyc_card">
				<div
					className="go-back"
					onClick={() =>
						navigate(`/cyc/user/${userInfo.id}`, {
							replace: true,
						})
					}
				>
					<LeftOutlined />
					<span style={{ marginLeft: 6 }}>返回个人主页</span>
				</div>
			</div>

			<div className="profile-main cyc_card">
				<div className="profile-main-title">基本信息</div>
				<div className="profile-main-info">
					<div className="profile-main-info-left">
						<Form
							form={form}
							name="profile"
							labelCol={{
								span: 8,
							}}
							wrapperCol={{
								span: 16,
							}}
							onFinish={updateInfo}
							autoComplete="off"
						>
							<Form.Item
								label="昵称"
								name="nickname"
								rules={[
									{
										required: true,
										message: "请输入昵称",
									},
								]}
								onChange={(e) => {
									setState({ nickname: e.target.value });
								}}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="密码"
								name="password"
								extra={
									<div
										onClick={() =>
											setState({
												updatePasswordVisible: true,
											})
										}
									>
										修改
									</div>
								}
							>
								<Input disabled />
							</Form.Item>

							<Form.Item label={null}>
								<Button
									type="primary"
									htmlType="submit"
									className="save-btn"
									disabled={!isModified}
								>
									保存修改
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div className="profile-main-info-right">
						<Upload
							customRequest={handleCoverUpload}
							showUploadList={false}
							maxCount={1}
							accept="image/*"
							listType="picture-circle"
							className="avatar-uploader"
							fileList={avatar ? [avatar] : []}
						>
							{avatar ? (
								<div className="avatar-uploader-img-wrapper">
									<img
										src={handleInsertValue(avatar)}
										alt="图片加载失败"
										style={{ width: "100%" }}
										className="avatar-uploader-img"
									/>
									<div className="avatar-uploader-mask">
										<div>
											<PlusCircleOutlined
												style={{ fontSize: 22 }}
											/>
											<div>点击修改头像</div>
										</div>
									</div>
								</div>
							) : (
								<div style={{ color: "#86909c" }}>
									<PlusOutlined />
									<div style={{ marginTop: 8 }}>上传头像</div>
								</div>
							)}
						</Upload>
					</div>
				</div>
			</div>

			<UpdatePasswordModel
				visible={updatePasswordVisible}
				onClose={() => setState({ updatePasswordVisible: false })}
			/>
		</ProfileStyle>
	);
};

export default Profile;
