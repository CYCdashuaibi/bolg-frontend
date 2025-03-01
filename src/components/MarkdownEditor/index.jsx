import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { message } from "antd";
import Vditor from "vditor";
import "vditor/dist/index.css";

import { handleUpload, handleInsertValue } from "@/utils";

import { MarkdownEditorStyle } from "./style";

const MarkdownEditor = forwardRef(({ initialValue, onChange }, ref) => {
	const [vd, setVd] = useState();

	useImperativeHandle(ref, () => ({
		getValue: () => vd?.getValue(),
		getHTML: () => vd?.getHTML(),
		reset: () => {
			vd?.setValue("");
		},
	}));

	useEffect(() => {
		const vditor = new Vditor("cycVditor", {
			mode: "sv",
			height: "100%",
			after: () => {
				vditor.setValue(initialValue || "");
				setVd(vditor);
			},
			counter: {
				enable: true,
			},
			preview: {
				delay: 0,
				hljs: {
					lineNumber: true,
				},
				// actions: ["desktop", "tablet", "mobile"],
				actions: [],
			},
			upload: {
				accept: "image/*",
				max: 10,
				handler: async (files) => {
					try {
                        const urls = await handleUpload(files, "article");

                        urls.forEach((url) => {
                            vditor.insertValue(`![](${handleInsertValue(url)})`);
                        });

                        return true;
					} catch (error) {
						console.error(error);
						message.error("上传失败");
						return false;
					}
				},
			},
		});

		// Clear the effect
		return () => {
			vd?.destroy();
			setVd(undefined);
		};
	}, [initialValue]);

	return <MarkdownEditorStyle id="cycVditor" className="vditor" />;
});

export default MarkdownEditor;
