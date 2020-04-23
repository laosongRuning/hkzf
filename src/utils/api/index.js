// 全局公共方法
import { getCityInfo } from '../api/city'
// 返回Peomise对象=》外边可以通过async  await接收
// 城市详细信息应该存储到本地
const CRE_CITY = 'cur_city'

// 进行城市比对方法
const getMycity = async () => {
    return new Promise((resolve, reject) => {
        let myCity = new window.BMap.LocalCity();
        myCity.get((res) => {
            resolve(res.name)
        })
    })
}


export async function getCurCity() {
    // 先从本地获取之前保存的城市详细信息
    let curcity = JSON.parse(localStorage.getItem(CRE_CITY))

    // 获取当前城市名字，如果改变需重新调取接口更新数据
    let res = await getMycity()
    let rea_name = res.substr(0, 2)
    if (!curcity || rea_name !== curcity.label) {
        // 如果没有就重新获取定位详细信息
        // 使用百度地图LocalCity类获取当前城市名字
        // 根据百度地图获取到城市名字，调用后台接口获取当前城市的详细数据
        return new Promise(async (resolve, reject) => {
            let res = await getCityInfo(rea_name);
            // console.log(res);
            // 显示到页面上
            if (res.status === 200) {
                // 存储到本地
                localStorage.setItem(CRE_CITY, JSON.stringify(res.data))
                // 传递Promise结果
                resolve(res.data)
            } else {
                reject('未知错误！')
            }
        })


    } else {
        // 如果有，返回本地存储信息
        return Promise.resolve(curcity)
    }
}