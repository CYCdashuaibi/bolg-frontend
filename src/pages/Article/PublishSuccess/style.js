import styled from 'styled-components';

export const PublishSuccessStyle = styled.div`
	.container {
		height: calc(100vh - 100px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.success-img {
			width: 180px;
		}

		.desc {
			margin-top: 40px;
            color: #333;
		}

		.go-home {
			margin-top: 40px;
			color: #1e80ff;
			cursor: pointer;
			background-color: rgba(30, 128, 255, 0.05);
			border-radius: 4px;
			font-size: 16px;
			line-height: 40px;
			width: 106px;
			border: 1px solid rgba(30, 128, 255, 0.3);
            padding: 0;

			&:hover {
				background-color: rgba(30, 128, 255, 0.1);
				border-color: rgba(30, 128, 255, 0.45);
			}

            &:active {
                background-color: rgba(30, 128, 255, 0.2);
				border-color: rgba(30, 128, 255, 0.6);
            }
		}
	}
`;
