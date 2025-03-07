import styled from 'styled-components';

export const DraftListStyle = styled.div`
	background: #fff;
	overflow: auto;
    max-height: calc(100vh - 304px);

	.draft-list {
		.entry-skeleton {
			padding: 12px 20px;
		}

		.draft-item {
			padding: 0 20px;

			&-wrapper {
				padding: 24px 12px;
				border-bottom: 1px solid rgba(228, 230, 235, 0.5);
			}

			&-title {
				font-weight: 700;
				color: #333;
			}

			&-footer {
				display: flex;
				align-items: center;
				margin-top: 12px;

				.time {
					line-height: 1.2;
					color: #909090;
					font-size: 14px;
					margin-right: 28px;
				}

				.more {
					.more-content {
						width: 50px;

						.edit,
						.delete {
							display: block;
							text-align: center;
							color: #909090;
							line-height: 24px;
							cursor: pointer;

							&:hover {
								color: #333;
							}
						}
					}
				}
			}
		}
	}
`;
