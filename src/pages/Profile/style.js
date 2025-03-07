import styled from 'styled-components';

export const ProfileStyle = styled.div`
	.profile {
		&-header {
			display: flex;
			align-items: center;
			padding-left: 22px;

			.go-back {
				line-height: 46px;
				color: #1e80ff;
				cursor: pointer;
				font-size: 14px;
			}
		}

		&-main {
			margin-top: 12px;

			&-title {
				padding: 16px 20px;
				font-size: 18px;
				line-height: 24px;
				border-bottom: 1px solid #e4e6eb;
			}

			&-info {
				display: flex;
				padding: 40px;

				&-left {
					flex: 1;
					margin-right: 100px;

					.save-btn {
						height: 36px;
						border-radius: 4px;
					}

					.ant-form-item-control {
						position: relative;

						.ant-form-item-additional {
							position: absolute;
							right: -46px;
							top: 0;

							.ant-form-item-extra {
								line-height: 32px;
								width: 40px;
								text-align: right;
								cursor: pointer;
								color: #1e80ff;

								&:hover {
									color: #4096ff;
								}

								&:active {
									color: #0958d9;
								}

								> div {
									text-align: center;
								}
							}
						}
					}
				}

				&-right {
					width: 300px;
					display: flex;
					flex-direction: column;
					align-items: center;

					.avatar-uploader-img-wrapper {
						position: relative;
						border-radius: 50%;
						overflow: hidden;

						.avatar-uploader-img {
							vertical-align: middle;

							&:hover {
								& + .avatar-uploader-mask {
									display: flex;
								}
							}
						}

						.avatar-uploader-mask {
							display: none;
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							z-index: 100;
							background-color: rgba(29, 33, 41, 0.5);
							color: #fff;
							align-items: center;
							justify-content: center;

							&:hover {
								display: flex;
							}
						}
					}
				}
			}
		}
	}
`;
