import React, { Component } from 'react'
import { getCityList, getHotCity } from '../../utils/api/city'

/* 
    城市列表
*/
class CityList extends Component {
    state = {
        cityList: {}
    }
    componentDidMount() {
        this.getCityData()
    }
    // 获取城市列表数据
    getCityData = async () => {
        const { status, data } = await getCityList()
        if (status === 200) {
            console.log('所有城市数据：', data);
            const { cityList,
                cityIndex } = this.formatCities(data);
            // console.log('处理完的数据：', cityList, cityIndex)
            // 获取热门城市数据=》加到设计好的数据中
            const { data: dt, status: st } = await getHotCity()
            // console.log('热门城市', res)
            if (st === 200) {
                cityList['hot'] = dt
                cityIndex.unshift('hot')
            }
            // console.log(cityList)

        }
    }


    // 处理后台数据：按拼音首字母归类城市
    // 1. 创建formatCities方法
    // 2. 定义变量
    //    * 按拼音首字母归类的城市数据=〉cityList = {}
    //    * 所有城市首字母数据=》cityIndex=[]
    // 3. 遍历后台返回的数据（利用=》**对象的属性不能相同的特点**）
    // 4. 通过Object.keys(cityList)获取**所有城市首字母数组**
    formatCities = (data) => {
        let cityList = {}, cityIndex = [];
        data.forEach((item) => {
            // debugger
            // 归类
            // 获取当前遍历城市的拼音首字母
            let firstLetter = item.short.slice(0, 1);
            // 对象中键（城市的拼音首字母）是否存在
            if (!cityList[firstLetter]) {
                // 没有按照城市的拼音首字母=》新增
                cityList[firstLetter] = [item]
            } else {
                // 存在
                cityList[firstLetter].push(item)
            }
        })
        // 这个类别数组（所有城市的拼音首字母）
        cityIndex = Object.keys(cityList).sort()
        // cityIndex =》cityList['b']
        return {
            cityList,
            cityIndex
        }
    }
    render() {
        return (
            <div>
                CITYLIST
            </div>
        )
    }
}
export default CityList;