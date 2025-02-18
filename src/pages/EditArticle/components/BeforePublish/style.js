import styled from 'styled-components';

export const BeforePublishStyle = styled.div`
	.popover {
		&-mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1000;
		}

		&-container {
			position: fixed;
			background-color: #fff;
			top: 70px;
			right: 48px;
			box-shadow: 0 1px 2px #f1f1f1;
			width: 556px;
			border: 1px solid #ddd;
			border-radius: 2px;

			&::before {
				content: '';
				position: absolute;
				top: -8px;
				right: 58px;
				width: 14px;
				height: 14px;
				background-color: #fff;
				border: 1px solid #ddd;
				border-right: none;
				border-bottom: none;
				transform: rotate(45deg);
			}
		}

		&-title {
			padding: 24px 20px 16px 20px;
			font-weight: 500;
			font-size: 18px;
			line-height: 24px;
			color: #1d2129;
			border-bottom: 1px solid #ddd;
		}

		&-content {
			overflow: auto;
			max-height: calc(100vh - 220px);

			.popover-form {
				.ant-form-item {
					margin: 20px 20px 32px;
				}
			}
		}

		&-form {
			#category {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;

				.ant-radio-button-wrapper {
					flex: 0 0 88px;
					font-size: 14px;
					line-height: 28px;
					height: 28px;
					border-radius: 2px;
					color: #86909c;
					background-color: #f4f5f5;
					border: none;

					&::before {
						display: none;
					}

					&.ant-radio-button-wrapper-checked {
						color: #1d7dfa;
						background-color: #e8f3ff;
					}
				}
			}

			.cover-uploader {
				.ant-upload {
					width: 192px;
					height: 128px;
				}
			}

			.cover-uploader-active {
				.ant-upload {
					height: 100%;
				}
			}

			.addvice {
				font-size: 14px;
				color: #909090;
				padding-left: 105px;
				margin-top: 8px;
				padding-bottom: 6px;
			}
		}

		&-footer {
			display: flex;
			justify-content: end;
			align-items: center;
			gap: 16px;
			border-top: 1px solid #e5e6eb;
			height: 72px;
			padding: 0 20px;
		}
	}
`;
