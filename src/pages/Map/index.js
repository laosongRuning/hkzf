import React from 'react'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile';
class Map extends React.Component {
    componentDidMount() {

    }
    // 初始化地图
    initMap = () => {
        // 创建地图实例
        //  地图定位的经纬度设置(天安门)
        // 地图初始化，同时设置地图展示级别
        const { BMap } = window;
        const map = new BMap.Map("container");
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }




    render() {
        return (
            <div className="mapBox">
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