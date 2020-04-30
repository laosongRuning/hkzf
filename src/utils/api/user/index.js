// 用户相关的所有的接口
// import instance from '../../axios'
import instance from '../../axios'
// import { getToken } from '../../index'

export function login(data) {
    return instance.post('/user/login',data)
}
export function getUserInfo() {
    return instance.get('/user')
}
export function logout() {
    return instance.post('/user/logout',null)
}
// 根据房源id检查房源是否收藏过
export function getCheckFav(id) {
    return instance.get(`/user/favorites/${id}`)
}
// 删除收藏
export function delFav(id) {
    return instance.delete(`/user/favorites/${id}`)
}
// 添加收藏
export function addFav(id) {
    return instance.post(`/user/favorites/${id}`)
}
// 定义用户发布房源的API
// 获取已发布房源 
export const getUserHouses = () => {
  return instance.get('/user/houses')
}
