// 用户相关的所有的接口
// import instance from '../../axios'
import instance from '../../axios'
import { getToken } from '../..'

export function login(data) {
    return instance.post('/user/login',{data}
                )
}
export function getUserInfo() {
    return instance.get('/user',{
        headers: {
            authorization: getToken()
        }
    })
}