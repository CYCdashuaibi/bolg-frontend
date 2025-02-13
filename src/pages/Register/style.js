import styled from 'styled-components';

import bgImg from '@/assets/images/login/bg.jpg';

export const RegisterStyle = styled.div`
	position: relative;
	background: url(${bgImg});
	background-repeat: no-repeat;
	background-size: cover;
	height: 100%;

	.register-card {
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 8px;
		width: 450px;
		box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.3);
		padding: 28px 45px 40px;

		.title {
			font-size: 24px;
			font-weight: bold;
			text-align: center;
		}

		.register-form {
			margin-top: 32px;

			.ant-input {
				height: 40px;
				font-size: 17px;
			}

			.iconfont {
				margin-right: 4px;
			}

			&-button {
				width: 100%;
				font-size: 18px;
				border-radius: 25px;
				height: 50px;
			}

			.forget-password {
				color: #666666;
				text-align: right;
				display: block;
				margin-top: 10px;

				&:hover {
					color: #1677ff;
				}
			}

			.login {
				color: #666666;
				text-align: center;
				display: block;

				&:hover {
					color: #1677ff;
				}
			}

			.email-info {
				font-size: 17px;
				color: #333;
				padding-bottom: 25px;
			}
		}
	}
`;
