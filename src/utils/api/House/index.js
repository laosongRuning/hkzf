// 找房所有的接口
// import instance from '../../axios'
import instance from '../../axios'

export function getFilters(id) {
    return instance.get('/house/condition',{
        params: {
            id
        }
    })
}