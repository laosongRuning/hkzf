// 城市相关接口
import instance from '../../axios'

// 城市详细信息获取数据
export function getCityInfo(name) {
    return instance.get('/area/info',{
        params: {
            name,
        }
    })
}

// 城市详细信息获取数据
export function getCityList(leave=1) {
    return instance.get(`/area/info/${leave}`)
}
// 热门城市信息获取数据
export function getCityHot() {
    return instance.get(`/area/hot`)
}

