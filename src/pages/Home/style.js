import styled from 'styled-components';

export const HomeStyle = styled.div`
	display: flex;
	gap: 20px;

	.home {
		&_left {
			height: fit-content;
			position: sticky;
			top: 78px;
		}
		&_center {
			flex: 1 1 auto;
			overflow: hidden;

			.list-header {
				padding: 12px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #e4e6eb;
			}

			.entry-list {
				min-height: calc(100vh - 180px);

				.entry {
					padding: 12px 20px;
					border-bottom: 1px solid rgba(228, 230, 235, 0.5);
					cursor: pointer;

					&:hover {
						background: #f7f8fa;
					}

					.content-wrapper {
						display: flex;
						overflow: hidden;

						.content-main {
							flex: 1 1 auto;
							overflow: hidden;

							.title {
								font-weight: 600;
								font-size: 16px;
								line-height: 24px;
								color: #252933;
							}

							.abstract {
								margin-top: 2px;
								color: #8a919f;
								font-size: 13px;
								line-height: 22px;
							}

							.entry-footer {
								margin-top: 4px;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.action-list {
									display: flex;
									align-items: center;

									.item {
										display: flex;
										align-items: center;
										font-size: 13px;
										line-height: 20px;
										color: #8a919f;
										margin-right: 24px;

										i {
											margin-right: 4px;
											font-size: 18px;
										}
									}
								}

								&-tags {
									display: flex;
									align-items: center;

									.footer-tag {
										background-color: #f2f3f5;
										padding: 0 6px;
										border-radius: 2px;
										margin-left: 6px;
										color: #8a919f;
										font-size: 12px;
										line-height: 20px;
									}
								}

								.footer-divider {
									width: 1px;
									height: 12px;
									background-color: #e4e6eb;
									margin: 0 -13px 0 12px;
								}
							}
						}

						.content-img {
							flex: 0 0 auto;
							width: 108px;
							height: 72px;
							margin-left: 24px;
							border: 1px solid rgba(228, 230, 235, 0.5);
							object-fit: cover;
							object-position: center;
						}
					}
				}

				.loading-spin {
					width: 100%;
					height: 80px;
				}
			}
		}
	}
`;
