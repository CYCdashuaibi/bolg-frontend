import styled from 'styled-components';

export const UpdatePasswordModelStyle = styled.div`
	display: ${({ $visible }) => ($visible ? 'block' : 'none')};
	transition: all 0.3s ease-in-out;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, ${({ $visible }) => ($visible ? 0.5 : 0)});
	z-index: 1000;

	.modal {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		background-color: #fff;

		&-close {
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
			color: #a0a2a7;

			&:hover {
				color: #8a919f;
			}
		}

		&-header {
			&-title {
				padding: 16px 20px;
				font-size: 18px;
				line-height: 24px;
				border-bottom: 1px solid #e4e6eb;
			}
		}

		&-main {
			padding: 10px 20px 20px 20px;

			.tip {
				color: #f56c6c;
				font-size: 14px;
			}

			.form {
				margin-top: 20px;
			}

			.ant-input-affix-wrapper {
				border-radius: 3px;
				padding: 11px;
			}

			.ant-form-item-control-input-content {
				text-align: center;
			}

			.save-btn {
				border-radius: 4px;
				width: 100px;
				height: 36px;
			}
		}
	}
`;
