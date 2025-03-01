import styled from 'styled-components';

export const EditArticleStyle = styled.div`
	height: 100%;

	.edit-article-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 28px;
		/* border-bottom: 1px solid #ddd; */

		.title-form {
			flex: 1;
			margin-right: 50px;
			height: 100%;

			.ant-input {
				border: none;
				outline: none;
				box-shadow: none;
				height: 64px;
				color: #0c111a;
				font-size: 24px;

				&::placeholder {
					color: #7a7a7a;
				}
			}
		}

		&-right {
			display: flex;
			align-items: center;
			gap: 16px;

			.ant-btn {
				border-radius: 2px;
			}

			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}
	}

	.edit-article-content {
		height: calc(100% - 64px);
	}
`;
