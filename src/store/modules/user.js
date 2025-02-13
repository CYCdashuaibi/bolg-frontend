import { message } from 'antd';
import { createSlice } from '@reduxjs/toolkit';

import { getToken as _getToken, setToken as _setToken, removeToken, decryptData } from '@/utils';

import { loginAPI, logoutAPI, getProfileAPI } from '@/apis/user';

import router from '@/router';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: _getToken() || '',
		userInfo: {},
	},
	// 同步
	reducers: {
		// 设置用户信息
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		// 设置 token
		setToken: (state, action) => {
			state.token = action.payload;
			_setToken(action.payload);
		},
		// 清除用户信息
		clearUserInfo: (state) => {
			state.token = '';
			state.userInfo = {};
			removeToken();
		},
	},
});

// 异步方法
// 登录
export const fetchLogin = (params) => async (dispatch) => {
	loginAPI(params).then((res) => {
		if (res.success) {
			dispatch(setToken(res.data.token));
			dispatch(setUserInfo(decryptData(res.data.userInfo)));
			message.success('登录成功');
			router.navigate('/home');
		} else {
			message.error(res.message);
		}
	});
};

// 退出登录
export const fetchLogout = () => async (dispatch) => {
	logoutAPI().then((res) => {
		if (res.success) {
			dispatch(clearUserInfo());
			message.success('退出成功');
		} else {
			message.error(res.message);
		}
	});
};

// 获取用户信息
export const fetchProfile = () => async (dispatch) => {
	getProfileAPI().then((res) => {
		if (res.success) {
			dispatch(setUserInfo(decryptData(res.data)));
		} else {
			message.error(res.message);
		}
	});
};

export const { setUserInfo, setToken, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
