import styled from 'styled-components';

export const ReplyStyle = styled.div`
	border: 1px solid #d9d9d9;
	border-radius: 6px;
	border-color: ${(props) => (props.$isFocus ? '#1677ff' : '#d9d9d9')};
	box-shadow: ${(props) =>
		props.$isFocus ? '0 0 0 2px rgba(5, 145, 255, 0.1)' : 'none'};

	textarea {
		border: none;
		box-shadow: none !important;
	}

	.footer {
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
`;

export const CommentActionsStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.actions-left {
		display: flex;
		align-items: center;

		.like {
			margin-right: 16px;
		}

		.like,
		.reply {
			cursor: pointer;
			display: flex;
			align-items: center;

			.iconfont {
				margin-right: 4px;
			}
		}
	}

	.actions-right {
		.delete-btn {
			color: rgba(0, 0, 0, 0.5);

			&:hover {
				color: #f5222d;
			}
		}
	}
`;
