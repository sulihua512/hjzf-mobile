/*
    城市相关的接口
*/

import http from '../axios'

// 获取当前所在 城市
export function getCurrCity(name) {
    return http.get('/area/info', {
        params: {
            name
        }
    })
}

// 获取所有城市列表
export function getCityList(level = 1) {
    return http.get('/area/city', {
        params: {
            level
        }
    })
}

// 获取热门城市
export function getHotCity() {
    return http.get('/area/hot')
}