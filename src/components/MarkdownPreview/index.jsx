import React, { useRef, useEffect } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

import { MarkdownPreviewStyle } from "./style";

const MarkdownPreview = ({ value }) => {
	const previewRef = useRef(null);

	useEffect(() => {
		if (previewRef.current && value) {
			Vditor.preview(previewRef.current, value, {
				mode: "light",
				anchor: 1,
				hljs: {
					lineNumber: true,
				},
				markdown: {
					toc: true,
				},
			});
		}
	}, [value]);

	return <MarkdownPreviewStyle ref={previewRef} />;
};

export default MarkdownPreview;
