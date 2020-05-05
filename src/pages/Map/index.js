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
        this.BMap = window.BMap;
        this.Map = this.BMap.Map("container");
        // var point = new BMap.Point(116.404, 39.915);
        // map.centerAndZoom(point, 15);
        // 获取定位城市
        const { value, lable } = await getCurCity()
        // 创建地址解析器实例     
        let myGeo = new this.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(null, async (point) => {
            if (point) {
                // 初始化地图，设置中心点坐标和地图级别  
                this.map.centerAndZoom(point, 11)
                // 添加控件
                this.map.addControl(new this.BMap.NavigationControl())
                this.map.addControl(new this.BMap.ScaleControl())
                // map.addOverlay(new BMap.Marker(point));
                // 默认调用一次渲染覆盖物（第一层的覆盖物）
                this.renderOverlay(value)

            }
        }, lable)
    }

    // 提供地图缩放级别和覆盖物类型
    getTypeAndZoom = () => {
        let type, nextLevel
        // 获取小区缩放级别

        const currZoom = this.map.getZoom() // 项目中默认缩放级别为：11
        if (currZoom >= 10 && currZoom < 12) {
            // 区
            type = 'circle'
            nextLevel = 13
        } else if (currZoom >= 12 && currZoom < 14) {
            // 镇
            type = 'circle'
            nextLevel = 15
        } else if (currZoom >= 14 && currZoom < 16) {
            // 小区
            type = 'rect'
        }
        return {
            type,
            nextLevel
        }
    }

    // 渲染覆盖物  城市id  区id  街道id  获取对应数据
    renderOverlay = async (id) => {
        // 根据不同的id获取当前定位城市区的数据
        let { status, data } = await getMapHouse(id)

        // 获取一下当前地图的缩放级别
        this.getTypeAndZoom()

        // console.log(res)
        if (status === 200) {
            data.forEach(item => {
                const {
                    coord: { longitude, latitude },
                    label: areaName,
                    count,
                    value: val
                } = item
                // 转换地理位置坐标
                const ipoint = new this.BMap.Point(longitude, latitude);
                // 创建文本覆盖物
                const opts = {
                    position: ipoint, // 指定文本标注所在的地理位置
                    offset: new this.BMap.Size(0, 0) //设置文本偏移量
                }
                // 初始化覆盖物实例
                const label = new this.BMap.Label(
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
                    this.map.centerAndZoom(ipoint, 13)
                    // 清除上一层覆盖物
                    // map.clearOverlays()
                    setTimeout(() => this.map.clearOverlays())
                    this.renderOverlay(val)
                })
                // 调用百度地图实例的addOverlay=》 添加覆盖物到地图
                this.map.addOverlay(label)
            });
        }
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