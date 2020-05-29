/*
    封装自己的axios
*/

import axios from 'axios';
import { Toast } from 'antd-mobile';

// 请求基础地址
// const BASE_URL = 'http://api-haoke-dev.itheima.net'
const BASE_URL = 'https://api-haoke-web.itheima.net'
// 创建axios实例
const myAxios = axios.create({
    baseURL: BASE_URL
});

// 请求拦截器
myAxios.interceptors.request.use(function (config) {
    Toast.loading('Loading...', 1);
    return config;
}, function (error) {
    return Promise.reject(error)
})
// 响应拦截器
myAxios.interceptors.response.use(function (response) {
    Toast.hide()
    // 简化数据
    const data = response.data
    let _res = {
        status: data.status,
        description: data.description,
        data: data.body
    }
    return _res;
}, function (error) {
    return Promise.reject(error)
})

// 导出
export { BASE_URL }
export default myAxios