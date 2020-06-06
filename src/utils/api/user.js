/*
    用户相关的接口
*/
import http from '../axios'

// 登录获取token
export function login(data) {
    return http.post('/user/login', data)
}
// 获取当前登录人信息
export function getUser(token) {
    return http.get('/user')
}
// 退出登录
export function logout(token) {
    return http.post('/user/logout', null)
}

// 根据ID和token检查当前房源是否收藏过
export function checkFavById(id) {
    return http.get(`/user/favorites/${id}`)
}
