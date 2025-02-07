import styled from 'styled-components';

import bgImage from '@/assets/images/welcome/bg.jpg';

export const WelcomeStyle = styled.div`
	position: relative;
	height: 100vh;
	background: url(${bgImage});
	background-size: cover;
	background-position: center;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.welcome-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 1;
		color: #fff;

		.avatar {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}

		.name {
			margin-top: 12px;
			font-size: 22px;
			font-weight: bold;
		}

		.line {
			margin: 12px 0;
			height: 1px;
			background-color: rgba(255, 255, 255, 0.5);
		}

		.enter-btn {
            margin-top: 18px;
			width: 130px;
			height: 40px;
			color: #fff;
			border-radius: 5px;
			font-family: 'Lato', sans-serif;
			font-weight: 500;
			cursor: pointer;
			transition: all 0.3s ease;
			position: relative;
			display: inline-block;
			box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
                2px 2px 2px 0px rgba(255, 255, 255, 0.5),
				7px 7px 20px 0px rgba(0, 0, 0, 0.1),
				4px 4px 5px 0px rgba(0, 0, 0, 0.1);
			outline: none;
			width: 130px;
			height: 40px;
			line-height: 42px;
			padding: 0;
			border: none;
			background: linear-gradient(
				0deg,
				rgba(255, 27, 0, 1) 0%,
				rgba(251, 75, 2, 1) 100%
			);

			&:hover {
				color: #f0094a;
				background: transparent;
				box-shadow: none;
			}

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				height: 2px;
				width: 0;
				background: #f0094a;
				box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
					4px 4px 5px 0px #0002;
				transition: 400ms ease all;
			}

			&::after {
				right: inherit;
				top: inherit;
				left: 0;
				bottom: 0;
			}

			&:hover:before,
			&:hover:after {
				width: 100%;
				transition: 800ms ease all;
			}
		}

        .menu {
            margin-top: 18px;

            &-item {
                cursor: pointer;

                &:hover {
                    color: #fd8457;
                }
            }
        }
	}
`;
