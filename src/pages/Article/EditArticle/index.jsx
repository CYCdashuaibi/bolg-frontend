import { useRef } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { useSetState } from "ahooks";

import { createArticleAPI } from "@/apis/article";
import { handleInsertValue } from "@/utils";
import { MarkdownEditor } from "@/components";
import BeforePublish from "./components/BeforePublish";

import { EditArticleStyle } from "./style";

import DefaultAvatar from "@/assets/images/default_avatar.png";

const initialState = {
	loading: false,
};

const EditArticle = (props) => {
	const { userInfo } = useSelector((state) => state.user);

	const [state, dispatch] = useSetState(initialState);
	const { loading } = state;

	const [form] = Form.useForm();
	const markdownEditorRef = useRef();
	const beforePublishRef = useRef();

	const onPublish = () => {
		form.validateFields().then((values) => {
			if (!values.title?.trim()) {
				message.error("请输入文章标题");
				return;
			}

			const content = markdownEditorRef.current.getValue();

			if (!content?.trim()) {
				message.error("请输入文章内容");
				return;
			}

			beforePublishRef.current.form
				.validateFields()
				.then((beforePublishValues) => {
					dispatch({ loading: true });

					const params = {
						...values,
						...beforePublishValues,
						content,
						status: "published",
					};

					createArticleAPI(params)
						.then((res) => {
							if (res?.success) {
								message.success("发布成功");
								form.resetFields();
								markdownEditorRef.current.reset();
								beforePublishRef.current.reset();
							}
						})
						.finally(() => {
							dispatch({ loading: false });
						});
				});
		});
	};

	const onSaveDraft = () => {
		dispatch({ loading: true });
		const values = form.getFieldsValue();
		const content = markdownEditorRef.current.getHTML();
		const beforePublishValues =
			beforePublishRef.current.form.getFieldsValue();

		const params = {
			...values,
			...beforePublishValues,
			content,
			status: "draft",
		};

		createArticleAPI(params)
			.then((res) => {
				if (res?.success) {
					message.success("保存草稿成功");
					form.resetFields();
					markdownEditorRef.current.reset();
					beforePublishRef.current.form.resetFields();
				}
			})
			.finally(() => {
				dispatch({ loading: false });
			});
	};

	return (
		<EditArticleStyle>
			<header className="edit-article-header">
				<Form name="title" form={form} className="title-form">
					<Form.Item name="title" style={{ marginBottom: 0 }}>
						<Input
							placeholder="请输入文章标题..."
							maxLength={100}
						/>
					</Form.Item>
				</Form>
				<div className="edit-article-header-right">
					<Button
						color="primary"
						variant="outlined"
						onClick={onSaveDraft}
					>
						保存草稿
					</Button>
					<BeforePublish
						ref={beforePublishRef}
						onPublish={onPublish}
						loading={loading}
					>
						<Button type="primary">发布</Button>
					</BeforePublish>
					<img
						src={
							userInfo.avatar
								? handleInsertValue(userInfo.avatar)
								: DefaultAvatar
						}
						alt="头像"
						className="avatar"
					/>
				</div>
			</header>
			<div className="edit-article-content">
				<MarkdownEditor ref={markdownEditorRef} />
			</div>
		</EditArticleStyle>
	);
};
export default EditArticle;
