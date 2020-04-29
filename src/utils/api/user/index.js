// 用户相关的所有的接口
// import instance from '../../axios'
import instance from '../../axios'

export function login(data) {
    return instance.post('/user/login',{data}
                )
}