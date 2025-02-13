import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./router";
import store from "./store";
import "@/assets/css/reset.scss";
import "@/assets/css/index.scss";

createRoot(document.getElementById("root")).render(
	<Suspense fallback={"加载中.."}>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</Suspense>,
);
