import styled from 'styled-components';

export const MarkdownPreviewStyle = styled.div`
	/* 强制显示目录 */
	.vditor-outline {
		display: block !important;
		opacity: 1 !important;
		visibility: visible !important;
	}

	/* 目录定位修正 */
	.vditor-outline__content {
		position: fixed !important;
		right: 20px !important;
		top: 80px !important;
		background: #fff !important;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1) !important;
		border-radius: 8px !important;
		padding: 12px !important;
		max-height: 70vh !important;
		overflow-y: auto !important;
		z-index: 999 !important;
	}
`;
