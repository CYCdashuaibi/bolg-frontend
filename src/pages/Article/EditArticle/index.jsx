import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useSetState } from "ahooks";

import {
	createArticleAPI,
	getArticleDetailAPI,
	updateArticleAPI,
} from "@/apis/article";
import { handleAvatar } from "@/utils";
import { MarkdownEditor } from "@/components";
import BeforePublish from "./components/BeforePublish";

import { EditArticleStyle } from "./style";

const initialState = {
	loading: false,
	articleDetail: {},
};

const EditArticle = () => {
	const { id } = useParams();
	window.document.title = id ? "编辑文章" : "创建文章";
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.user);

	const [state, dispatch] = useSetState(initialState);
	const { loading, articleDetail } = state;

	const [form] = Form.useForm();
	const markdownEditorRef = useRef();
	const beforePublishRef = useRef();

	useEffect(() => {
		if (id) {
			getArticleDetail();
		}
	}, [id]);

	const getArticleDetail = () => {
		getArticleDetailAPI(id).then((res) => {
			if (res?.success) {
				dispatch({ articleDetail: res.data });
				form.setFieldsValue({
					title: res.data.title,
				});
			}
		});
	};

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

					const api = id ? updateArticleAPI : createArticleAPI;

					if (id) {
						params.id = id;
					}

					api(params)
						.then((res) => {
							if (res?.success) {
								message.success(id ? "更新成功" : "发布成功");
								form.resetFields();
								markdownEditorRef.current.reset();
								beforePublishRef.current.reset();
								navigate("/cyc/publish-success", { replace: true });
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
					navigate(`/cyc/user/${userInfo.id}/2`, { replace: true });
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
					{!id && (
						<Button
							color="primary"
							variant="outlined"
							onClick={onSaveDraft}
						>
							保存草稿
						</Button>
					)}
					<BeforePublish
						ref={beforePublishRef}
						onPublish={onPublish}
						loading={loading}
						initialValue={articleDetail}
						isEdit={!!id}
					>
						<Button type="primary">{id ? "更新" : "发布"}</Button>
					</BeforePublish>
					<img
						src={handleAvatar(userInfo.avatar)}
						alt="头像"
						className="avatar"
					/>
				</div>
			</header>
			<div className="edit-article-content">
				<MarkdownEditor
					ref={markdownEditorRef}
					initialValue={articleDetail.content}
				/>
			</div>
		</EditArticleStyle>
	);
};
export default EditArticle;
