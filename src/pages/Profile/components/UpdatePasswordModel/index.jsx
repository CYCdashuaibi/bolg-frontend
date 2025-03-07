import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	CloseCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import { updatePasswordAPI } from "@/apis/user";
import { clearUserInfo } from "@/store/modules/user";
import { encryptData } from "@/utils";

import { UpdatePasswordModelStyle } from "./style";

const UpdatePasswordModel = ({ visible, onClose }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (visible) {
			form.resetFields();
		}
	}, [visible]);

	const onFinish = (values) => {
		const { newPassword, oldPassword } = values;
		updatePasswordAPI({
			newPassword: encryptData(newPassword),
			oldPassword: encryptData(oldPassword),
		}).then((res) => {
			if (res.success) {
				message.success("密码修改成功");
				onClose();
				dispatch(clearUserInfo());
				navigate("/login");
			}
		});
	};

	return (
		<UpdatePasswordModelStyle $visible={visible}>
			<div className="modal cyc_card">
				<div className="modal-close">
					<CloseCircleOutlined onClick={onClose} />
				</div>
				<div className="modal-header">
					<div className="modal-header-title">修改密码</div>
				</div>
				<div className="modal-main">
					<div className="tip">
						<ExclamationCircleOutlined />
						<span style={{ marginLeft: 4 }}>
							修改密码后，需要重新登录
						</span>
					</div>
					<Form
						form={form}
						name="updatePassword"
						onFinish={onFinish}
						className="form"
					>
						<Form.Item
							name="oldPassword"
							rules={[
								{
									required: true,
									message: "请输入旧密码",
								},
							]}
						>
							<Input.Password placeholder="旧密码" />
						</Form.Item>

						<Form.Item
							name="newPassword"
							rules={[
								{
									required: true,
									message: "请输入新密码",
								},
								{
									min: 6,
									message: "密码长度不能小于6位",
								},
								{
									validator: (_, value) =>
										value &&
										value ===
											form.getFieldValue("oldPassword")
											? Promise.reject(
													"新密码不能与旧密码相同",
											  )
											: Promise.resolve(),
								},
							]}
						>
							<Input.Password placeholder="设置新密码" />
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							rules={[
								{
									required: true,
									message: "请确认确认密码",
								},
								{
									validator: (_, value) =>
										value &&
										value !==
											form.getFieldValue("newPassword")
											? Promise.reject("两次密码不一致")
											: Promise.resolve(),
								},
							]}
						>
							<Input.Password placeholder="再次确认密码" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="save-btn"
							>
								修改
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</UpdatePasswordModelStyle>
	);
};

export default UpdatePasswordModel;
