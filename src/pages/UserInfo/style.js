import styled from 'styled-components';

export const UserInfoStyle = styled.div`
	.header {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 30px;

		&-avatar {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 30px;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&-info {
			flex: 1;

			&-nickname {
				font-size: 20px;
				font-weight: 600;
				line-height: 1.2;
				color: #000;
			}
		}
	}

	.main {
		margin-top: 12px;

		&-tabs {
			padding: 0 20px;
			background: #fff;
			border-radius: 6px 6px 0 0;

			.ant-tabs-nav {
				margin: 0;
			}
		}
	}
`;
