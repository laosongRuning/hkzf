import React from 'react'
import { getCityList, getCityHot } from '../../utils/api/city'
class CityList extends React.Component {
    state = {

    }
    componentDidMount() {
        this.getCityList()
    }
    // 获取城市列表数据
    getCityList = async () => {
        const { status, data } = await getCityList()
        if (status === 200) {
            let { cityList, cityIndex } = this.formmatData(data)
            // 加入热门城市数据
            let { status: st, data: da } = await getCityHot()
            if (st === 200) {
                cityIndex.unshift('hot')
                cityList['hot'] = da

            }
        }
    }
    // 改造后台数据
    // 格式化城市列表数据
    formmatData = (data) => {
        let cityList = {}, cityIndex;
        data.forEach((item) => {
            // 截取首字母
            let first = item.short.slice(0, 1);
            // 判断对象中是否存在某个属性
            if (!(first in cityList)) {
                cityList[first] = [item]
            } else {
                cityList[first].push(item)
            }
        })
        cityIndex = Object.keys(cityList).sort()
        console.log('formated:', cityList, cityIndex);
        return {
            cityIndex,
            cityList
        }
    }






    render() {
        return (
            <div>城市列表</div>
        )
    }
}

export default CityList