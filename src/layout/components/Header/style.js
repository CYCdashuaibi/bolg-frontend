import styled from 'styled-components';

export const HeaderStyle = styled.header`
	position: sticky;
	left: 0;
	top: 0;
	background: #fff;
	height: 60px;
	box-shadow: 0 2px 8px #f2f3f5;
	z-index: 1000;
	padding: 0 22px;

	.container {
		min-height: 60px;
		display: flex;
		align-items: center;

		.logo {
			height: 30px;
		}

		ul {
			display: flex;
			align-items: center;
		}

		.header-nav {
			flex: 1;

			.nav-list-menu {
				flex: 1;
				display: flex;
				justify-content: center;

				&-item {
					line-height: 60px;
					padding: 0 12px;
					font-size: 14px;
					color: #515767;
					position: relative;

					&::after {
						display: none;
						content: '';
						position: absolute;
						top: auto;
						right: 0;
						bottom: 0;
						left: 12px;
						height: 2px;
						background-color: #1e80ff;
						width: calc(100% - 24px);
					}

					&.active {
						color: #1e80ff;
					}

					&:hover {
						color: #252933;

						&::after {
							display: block;
						}
					}
				}
			}

			.nav-list-right {
				.search {
					margin-right: 26px;
				}

				.add {
					margin-right: 26px;
				}

				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
			}
		}

		.login-content {
			background: rgba(30, 128, 255, 0.05);
			border: 1px solid rgba(30, 128, 255, 0.3);
			border-radius: 4px;
			padding: 0 12px;
			color: #007fff;
			font-size: 14px;
			font-weight: 400;
			display: flex;
			align-items: center;
			line-height: 32px;

			.bar {
				width: 1px;
				height: 12px;
				background-color: #abcdff;
				margin: 0 8px;
			}

			.login-btn,
			.register-btn {
				&:hover {
					color: #84b5ff;
				}
			}
		}
	}
`;
