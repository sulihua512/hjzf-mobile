import React, { Component } from 'react'
import styles from './index.module.css'
import { NavBar, Icon } from 'antd-mobile';
import { getCurCity } from '../../utils';


class Map extends Component {
    componentDidMount() {
        this.initMap()
    }
    // 初始化百度地图
    initMap = async () => {
        // console.log(window.BMapGL)
        // 解构BMap地图方法对象
        const { BMap } = window;
        // 创建地图实例
        const map = new BMap.Map("container");
        // 根据当前定位城市=》显示地图
        const { label, value } = await getCurCity();

        // 创建地址解析器实例     
        const myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(null, function (point) {
            if (point) {

                map.centerAndZoom(point, 11);
                // 添加缩放控件
                map.addControl(new BMap.NavigationControl());
                // 添加比例尺控件
                map.addControl(new BMap.ScaleControl());
                // 文本覆盖物
                const opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-30, 0) //设置文本偏移量
                }
                const label = new BMap.Label(
                    'haidianq',
                    opts
                ) // 创建文本标注对象
                label.setContent(
                    `
                  <div class="${styles.bubble}">
                    <p class="${styles.bubbleName}">浦东新区</p>
                    <p>388套</p>
                  </div>
                  `
                )
                // 去除默认样式
                label.setStyle({
                    border: 'none'
                })
                // 添加点击事件
                label.addEventListener('click', () => {
                    console.log('覆盖物被点击了', point, value)
                })
                map.addOverlay(label)
                // 添加覆盖物的方法
                // map.addOverlay(new BMap.Marker(point));
            }
        },
            label);


        // // 设置中心点坐标
        // const point = new BMap.Point(116.404, 39.915);
        // // 地图初始化，同时设置地图展示级别
        // map.centerAndZoom(point, 15);
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