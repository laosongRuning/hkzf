// 首页相关的所有借口
import instance from '../../axios'

// 走马灯获取数据
export function getSwiper() {
    return instance.get('/home/swiper')
}

// 获取租房小组接口
export function getGroup(area) {
    return instance.get('/home/groups',{
        params: {
            area
        }
    })
}
// 获取资讯小组接口
export function getNews(area) {
    return instance.get('/home/news',{
        params: {
            area
        }
    })
}