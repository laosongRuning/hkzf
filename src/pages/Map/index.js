import React from 'react'
import styles from './index.module.css'
import { NavBar, Icon } from 'antd-mobile';
import { getCurCity } from '../../utils/index'
import { getMapHouse } from '../../utils/api/city';
class Map extends React.Component {
    componentDidMount() {
        this.initMap()
    }
    // 初始化地图
    initMap = async () => {
        // 创建地图实例
        //  地图定位的经纬度设置(天安门)
        // 地图初始化，同时设置地图展示级别
        const { BMap } = window;
        const map = new BMap.Map("container");
        // var point = new BMap.Point(116.404, 39.915);
        // map.centerAndZoom(point, 15);
        // 获取定位城市
        const { value, lable } = await getCurCity()
        // 创建地址解析器实例     
        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(null, async (point) => {
            if (point) {
                // 初始化地图，设置中心点坐标和地图级别  
                map.centerAndZoom(point, 11)
                // 添加控件
                map.addControl(new BMap.NavigationControl())
                map.addControl(new BMap.ScaleControl())
                // map.addOverlay(new BMap.Marker(point));

                // 获取当前定位城市区的数据
                let { status, data } = await getMapHouse(value)
                // console.log(res)
                if (status === 200) {
                    data.forEach(item => {
                        const {
                            coord: { longitude, latitude },
                            label: areaName,
                            count,
                            value:val
                          } = item
                          // 转换地理位置坐标
                        const ipoint = new BMap.Point(longitude, latitude);
                        // 创建文本覆盖物
                        const opts = {
                            position: ipoint, // 指定文本标注所在的地理位置
                            offset: new BMap.Size(0, 0) //设置文本偏移量
                        }
                        // 初始化覆盖物实例
                        const label = new BMap.Label(
                            null,
                            opts
                        )
                        label.setContent(
                            `
                            <div class="${styles.bubble}">
                            <p class="${styles.bubbleName}">${areaName}</p>
                            <p>${count}套</p>
                            </div>
                            `
                        )
                        // 创建文本标注对象
                        label.setStyle({
                            border: 'none'
                        })
                        // 添加点击事件
                        label.addEventListener('click', () => {
                            // console.log('覆盖物被点击了', point)
                            map.centerAndZoom(ipoint, 13)
                            // 清除上一层覆盖物
                            // map.clearOverlays()
                            setTimeout(() => map.clearOverlays())
                        })
                        // 调用百度地图实例的addOverlay=》 添加覆盖物到地图
                        map.addOverlay(label)
                    });
                }
            }
        }, lable)
    }

    render() {
        return (
            <div className={styles.mapBox}>
                {/* 导航栏 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    地图找房
                </NavBar>
                {/* 地图 */}
                <div id="container"></div>
            </div>
        )
    }
}

export default Map