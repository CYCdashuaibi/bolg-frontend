import React, { useRef, useEffect } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

import { IMAGE_BASE_URL } from "@/utils";

import { MarkdownPreviewStyle } from "./style";

const MarkdownPreview = ({ value }) => {
	const previewRef = useRef(null);

	useEffect(() => {
		if (previewRef.current && value) {
			Vditor.preview(
				previewRef.current,
				value.replaceAll(
					/!\[[^\]]*\]\((\/[^)]+)\)/g,
					`![](${IMAGE_BASE_URL}$1)`,
				),
				{
					mode: "light",
					anchor: 1,
					hljs: {
						lineNumber: true,
					},
					markdown: {
						toc: true,
					},
				},
			);
		}
	}, [value]);

	return <MarkdownPreviewStyle ref={previewRef} />;
};

export default MarkdownPreview;
