import { useRef } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";

import { handleInsertValue } from "@/utils";
import { MarkdownEditor } from "@/components";
import BeforePublish from "./components/BeforePublish";

import { EditArticleStyle } from "./style";

import DefaultAvatar from "@/assets/images/default_avatar.png";

const EditArticle = (props) => {
	const { userInfo } = useSelector((state) => state.user);

	const [form] = Form.useForm();
	const markdownEditorRef = useRef();
	const beforePublishRef = useRef();

	const onPublish = () => {
		form.validateFields().then((values) => {
			if (!values.title?.trim()) {
				message.error("请输入文章标题");
				return;
			}

			beforePublishRef.current.form
				.validateFields()
				.then((beforePublishValues) => {
					const content = markdownEditorRef.current.getHTML();

					const params = {
						...values,
						...beforePublishValues,
						content,
					};
					console.log(params, "params");
				});
		});
	};

	const onSaveDraft = () => {
		const value = markdownEditorRef.current.getHTML();
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
					<BeforePublish ref={beforePublishRef} onPublish={onPublish}>
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
