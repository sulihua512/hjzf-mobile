/* 
    全局公共的方法
*/
import { getCurrCity } from './api/city';

// 定义token=>key
const HJZFW_TOKEN = 'hjzfw_token';
// 封装 token相关方法
export function setToken(token) {
    setLocalData(HJZFW_TOKEN, token)
}
export function getToken() {
    return getLocalData(HJZFW_TOKEN)
}
export function delToken() {
    return removeLocalData(HJZFW_TOKEN)
}
// 判断用户是否登录（是否有token）
export function isAuth() {
    return !!getToken()
}

// 封装本地存储方法
// 获取本地数据
export const getLocalData = (key) => {
    return window.localStorage.getItem(key)
}
// 设置本地数据
export const setLocalData = (key, val) => {
    window.localStorage.setItem(key, val)
}
// 删除本地数据
export const removeLocalData = (key) => {
    window.localStorage.removeItem(key)
}
// 业务流程
//      1. 如果没有本地数据->利用百度地图API获取当前城市->发送请求获取城市详细信息->并保存本地数据->Promise返回城市数据
//      2. 如果有本地数据->直接Promise.resolve(数据)返回
const CURR_CITY = 'curr_city';
export function getCurCity() {
    // 从本地获取定位信息
    const currcity = JSON.parse(localStorage.getItem(CURR_CITY))
    if (!currcity) {
        return new Promise((reslove, reject) => {
            // 没有获取到本地信息
            const { BMap } = window;
            const myCity = new BMap.LocalCity();
            myCity.get(async (result) => {
                const cityName = result.name;
                // console.log("当前定位城市:" + cityName);
                const { status, data } = await getCurrCity(cityName)
                if (status === 200) {
                    // 存储到本地
                    localStorage.setItem(CURR_CITY, JSON.stringify(data))
                    // 外部调用=》拿到的结果/数据
                    reslove(data)
                } else {
                    reject('errot')
                }
            });
        })
    } else {
        // 获取到
        return Promise.resolve(currcity)
    }
}
export { CURR_CITY, HJZFW_TOKEN }