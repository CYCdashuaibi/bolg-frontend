import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Form, Button, Select, Input, Upload, Radio, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";

import { getCategoryListAPI } from "@/apis/category";
import { getTagListAPI } from "@/apis/tag";

import { handleUpload, handleInsertValue } from "@/utils/tools";

import { BeforePublishStyle } from "./style";

const initialState = {
	visible: false,
	categorys: [],
	tags: [],
	cover: null,
};

const BeforePublish = forwardRef(
	({ children, onPublish, loading, initialValue, isEdit = false }, ref) => {
		const [state, dispatch] = useSetState(initialState);
		const { visible, categorys, tags, cover } = state;

		const [form] = Form.useForm();

		useImperativeHandle(ref, () => ({
			open: () => {
				dispatch({ visible: true });
			},
			close: () => {
				dispatch({ visible: false });
			},
			form,
			reset: () => {
				if (form) {
					form.resetFields();
				}
				dispatch({ cover: null });
			},
		}));

		useEffect(() => {
			if (visible && initialValue) {
				form.setFieldsValue({
					category_id: initialValue?.Category?.id,
					tags: initialValue?.Tags?.map((item) => item.id),
					cover_image: initialValue.cover_image,
					summary: initialValue.summary,
				});
				dispatch({ cover: initialValue.cover_image });
			}
		}, [visible, initialValue]);

		useEffect(() => {
			getCategoryListAPI().then((res) => {
				if (res.success) {
					dispatch({
						categorys: res.data.map((item) => ({
							label: item.name,
							value: item.id,
						})),
					});
				}
			});
			getTagListAPI().then((res) => {
				if (res.success) {
					dispatch({
						tags: res.data.map((item) => ({
							label: item.name,
							value: item.id,
						})),
					});
				}
			});
		}, []);

		const handleCoverUpload = ({
			file,
			onProgress,
			onSuccess,
			onError,
		}) => {
			// 只能上传图片
			if (!file.type.startsWith("image/")) {
				message.error("只能上传图片");
				return false;
			}

			handleUpload([file], "article")
				.then((urls) => {
					dispatch({ cover: urls[0] });
					form.setFieldsValue({ cover_image: urls[0] });

					onSuccess(urls[0]);
				})
				.catch((err) => {
					onError(err);
					message.error("上传失败", err);
				});
		};

		return (
			<BeforePublishStyle>
				<div
					className="children-container"
					onClick={() => dispatch({ visible: true })}
				>
					{children}
				</div>
				{visible && (
					<div
						className="popover-mask"
						onClick={() => dispatch({ visible: false })}
					>
						<div
							className="popover-container"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="popover-title">发布文章</div>
							<div className="popover-content">
								<Form
									form={form}
									labelCol={{
										span: 4,
									}}
									wrapperCol={{
										span: 18,
									}}
									className="popover-form"
									preserve={false}
								>
									<Form.Item
										name="category_id"
										label="分类"
										rules={[
											{
												required: true,
												message: "请选择分类",
											},
										]}
									>
										<Radio.Group
											block
											options={categorys}
											optionType="button"
										/>
									</Form.Item>
									<Form.Item
										name="tags"
										label="添加标签"
										rules={[
											{
												required: true,
												message: "请选择标签",
											},
										]}
									>
										<Select
											mode="multiple"
											maxCount={3}
											placeholder="请选择标签"
											optionFilterProp="label"
											options={tags}
										/>
									</Form.Item>
									<Form.Item
										name="cover_image"
										label="文章封面"
										style={{
											marginBottom: 0,
										}}
									>
										<Upload
											customRequest={handleCoverUpload}
											showUploadList={false}
											maxCount={1}
											accept="image/*"
											listType="picture-card"
											className={
												cover
													? "cover-uploader cover-uploader-active"
													: "cover-uploader"
											}
											fileList={cover ? [cover] : []}
										>
											{cover ? (
												<img
													src={handleInsertValue(
														cover,
													)}
													alt="图片加载失败"
													style={{ width: "100%" }}
												/>
											) : (
												<div
													style={{ color: "#86909c" }}
												>
													<PlusOutlined />
													<div
														style={{ marginTop: 8 }}
													>
														上传封面
													</div>
												</div>
											)}
										</Upload>
									</Form.Item>
									<div className="addvice">
										建议尺寸：192*128px
										(封面仅展示在首页信息流中)
									</div>
									<Form.Item
										name="summary"
										label="编辑摘要"
										rules={[
											{
												required: true,
												message: "请输入摘要",
											},
										]}
									>
										<Input.TextArea
											placeholder="请输入文章摘要"
											maxLength={100}
											showCount
											autoSize={{
												minRows: 4,
												maxRows: 8,
											}}
										/>
									</Form.Item>
								</Form>
							</div>
							<div className="popover-footer">
								<Button
									color="primary"
									variant="outlined"
									onClick={() => dispatch({ visible: false })}
									loading={loading}
								>
									取消
								</Button>
								<Button
									type="primary"
									onClick={onPublish}
									loading={loading}
								>
									{isEdit ? "确认并更新" : "确认并发布"}
								</Button>
							</div>
						</div>
					</div>
				)}
			</BeforePublishStyle>
		);
	},
);

export default BeforePublish;
