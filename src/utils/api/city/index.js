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