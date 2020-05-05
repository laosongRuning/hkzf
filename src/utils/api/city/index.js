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
// 地图下钻查询房源信息相关
// 多用接口  
/**
 * 
 * @param {*} id 
 * id 城市id=》获取当前城市区的数据
 *    区id  =？获取当前区下街道数据
 *    街道id =》获取到当前小区数据
 */
export function getMapHouse(id) {
    return instance.get('/area/map',{
        params: {
            id
        }
    })
}
