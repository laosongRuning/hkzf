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