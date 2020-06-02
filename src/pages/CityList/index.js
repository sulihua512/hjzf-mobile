import React, { Component } from 'react'
import { getCityList, getHotCity } from '../../utils/api/city'
import { getCurCity } from '../../utils/index';
// 列表组件
import { AutoSizer, List } from 'react-virtualized';
// 引入组件样式
import './index.scss'
import { NavBar, Icon, Toast } from 'antd-mobile';
import { setLocalData, CURR_CITY } from '../../utils/index'

// 假数据
// const list = Array.from(new Array(100)).map((item, index) => index)
/* 
    城市列表
*/
class CityList extends Component {
    // 定义状态数据
    state = {
        // 归类的数据
        cityList: {},
        // 列表归类的分类
        cityIndex: []
    }
    componentDidMount() {
        this.getCityData()
    }
    // 获取城市列表数据
    getCityData = async () => {
        const { status, data } = await getCityList()
        if (status === 200) {
            // console.log('所有城市数据：', data);
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
            // 获取当前城市
            const curCity = await getCurCity()
            cityList['#'] = [curCity]
            cityIndex.unshift('#')
            console.log(cityList);
            // 做响应式处理
            this.setState({
                cityList,
                cityIndex
            })

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
    // 格式化title
    formTitle = (title) => {
        switch (title) {
            case '#':
                return '当前城市';
            case 'hot':
                return '热门城市';
            default:
                return title.toUpperCase()

        }
    }
    // 动态计算row的高度
    /* 
        index 当前行的索引
    */
    execHeight = ({ index }) => {
        // 获取归类的数据，并渲染列表
        const { cityIndex, cityList } = this.state;
        // 列表下归类：title
        const title = cityIndex[index]
        // 对应title下的城市列表
        const titleCity = cityList[title]
        return 36 + 50 * titleCity.length
    }
    // 切换定位城市事件函数
    selCity = (item) => {
        // console.log(item)
        const hasData = ['北京', '上海', '广州', '深圳'];
        if (hasData.includes(item.label)) {
            // 存在
            // 更新本地定位数据
            setLocalData(CURR_CITY, JSON.stringify(item))
            // 返回首页
            this.props.history.goBack()
        } else {
            // 不存在
            Toast('当前城市还暂无房源信息！！！', 2)
        }
    }
    // 行渲染
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        // 获取归类的数据，并渲染列表
        const { cityIndex, cityList } = this.state;
        // 列表下归类：title
        const title = cityIndex[index]
        // 对应title下的城市列表
        const titleCity = cityList[title]
        return (
            <div key={key} style={style} className="city-item">
                <div className="title">{this.formTitle(title)}</div>
                {titleCity.map((item) =>
                    <div className="name" key={item.value} onClick={() => {
                        this.selCity(item)
                    }}>{item.label}</div>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="cityListBox">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >城市列表</NavBar>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="listBox"
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.execHeight}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>


            </div>
        )
    }
}
export default CityList;