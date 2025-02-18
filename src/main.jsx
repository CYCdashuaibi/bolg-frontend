import { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import router from "./router";
import store from "./store";
import "@/assets/css/reset.scss";
import "@/assets/css/index.scss";
import { fetchProfile } from '@/store/modules/user';
import { getToken } from '@/utils';

const AppInitializer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (getToken()) {
			dispatch(fetchProfile());
		}
	}, [dispatch]);

	return null; // 不渲染任何实际的组件
};

createRoot(document.getElementById("root")).render(
	<Suspense fallback={"加载中.."}>
		<Provider store={store}>
			<AppInitializer />
			<RouterProvider router={router} />
		</Provider>
	</Suspense>,
);
