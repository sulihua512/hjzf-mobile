import React, { Component } from 'react'
import './index.scss'
import { NavBar, Icon } from 'antd-mobile';


class Map extends Component {
    componentDidMount() {
        this.initMap()
    }
    // 初始化百度地图
    initMap = () => {
        // console.log(window.BMapGL)
        // 解构BMap地图方法对象
        const { BMap } = window;
        // 创建地图实例
        const map = new BMap.Map("container");
        // 设置中心点坐标
        const point = new BMap.Point(116.404, 39.915);
        // 地图初始化，同时设置地图展示级别
        map.centerAndZoom(point, 15);
    }

    render() {
        return (
            <div className="mapBox">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >地图找房</NavBar>
                <div id="container"></div>
            </div >
        )
    }
}
export default Map;