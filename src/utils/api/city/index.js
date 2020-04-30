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

// 获取城市列表数据
export const getCityList = (level = 1) => {
    return instance.get(`/area/city?level=${level}`)
  }
// 热门城市信息获取数据
export function getCityHot() {
    return instance.get('/area/hot')
}
// 关键词所搜id
export function getCommunity(id,name) {
    return instance.get('/area/community',{
        params: {
            id,name
        }
    })
}
