// 首页相关的所有借口
import instance from '../../axios'

// 走马灯获取数据
export function getSwiper() {
    return instance.get('/home/swiper')
}