// 找房所有的接口
// import instance from '../../axios'
import instance from '../../axios'

export function getFilters(id) {
    return instance.get('/houses/condition',{
        params: {
            id
        }
    })
}
// 根据筛选器条件获取房源列表
export function getHouseList(cityId,filters,start,end) {
    return instance.get('/houses',{
        params: {
            cityId,
            // 组装的过滤器数据解构出来
            ...filters,
            // 分页参数，开始结束
            start,
            end
        }
    })
}

// 根据房源id获取房源详情
export function getFilterId(id) {
    return instance.get(`/houses/${id}`)
}
// 上传图片
export function upLoadImgs(fd) {
    return instance.post(`/houses/image`,fd)
}