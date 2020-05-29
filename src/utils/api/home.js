import myAxios from '../axios'
/*  
    首页相关的接口
*/

// 获取轮播图数据
export function getSwiper() {
    return myAxios.get('/home/swiper')
}

// 获取租房小组数据
export function getGroups(area = 'AREA|88cff55c-aaa4-e2e0') {
    return myAxios.get('/home/groups', {
        params: {
            area
        }
    })
}
// 获取最新资讯数据
export function getNews(area = 'AREA|88cff55c-aaa4-e2e0') {
    return myAxios.get('/home/news', {
        params: {
            area
        }
    })
}