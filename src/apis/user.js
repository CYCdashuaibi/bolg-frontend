// 用户相关的请求
import { request } from "@/utils";

export const loginAPI = (data) => request({
  url: '/authorizations',
  method: 'POST',
  data: data
})

export const getProfileAPI = () => request({
  url: '/user/profile',
  method: 'GET'
})
