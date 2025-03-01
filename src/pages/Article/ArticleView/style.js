import styled from 'styled-components';

export const ArticleViewStyle = styled.div`
	height: 100%;

	.ant-spin-nested-loading {
		height: 100%;
	}

	.article-info {
		padding: 28px;

		&-header {
			&-title {
				font-weight: 600;
				font-size: 28px;
				line-height: 1.2;
			}

			&-info {
				margin-top: 16px;
				display: flex;
				gap: 16px;
				font-size: 14px;
				color: #8a919f;

				.info-author {
					color: #515767;
				}

				.info-author,
				.info-createTime,
				.info-viewCount {
					display: flex;
					align-items: center;
					gap: 4px;
				}
			}
		}

		&-main {
			margin-top: 24px;
		}
	}

	.article-comment {
		margin-top: 20px;
		padding: 20px 32px;

		&-header {
			font-size: 18px;
			font-weight: 600;
			line-height: 30px;
			color: #252933;
		}

		&-action {
			display: flex;
			margin-top: 32px;

			.action-left {
				margin-right: 16px;

				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
			}

			.action-right {
				flex: 1;
				border: 1px solid #d9d9d9;
                border-radius: 6px;

				textarea {
					border: none;
					box-shadow: none;
				}

				&-footer {
					display: flex;
					align-items: center;
					justify-content: end;
					padding: 8px 16px;

                    .font-length {
                        color: #515767;
                        font-size: 14px;
                        margin-right: 16px;
                    }
				}
			}
		}

		&-main {
			margin-top: 20px;
		}
	}
`;
