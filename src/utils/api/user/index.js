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
