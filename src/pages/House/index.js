import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { getCurCity } from '../../utils'
import { getListByFilters } from '../../utils/api/house'
import { AutoSizer, List } from 'react-virtualized';

export default class HouseList extends React.Component {
    state = {
        // 房源列表数据
        list: []
    }
    // 父组件接收子组件的数据
    onFilter = (filters) => {
        console.log('父组件接收子组件的数据', filters);
        this.filters = filters
        // 3. 默认调用接口获取房源列表
        this.getHouseList()
    }
    async componentDidMount() {
        // 1.获取当前定位城市的Id
        let { value } = await getCurCity()
        this.cityId = value;
        // console.log('当前城市', this.cityId)
        // 3. 默认调用接口获取房源列表
        this.getHouseList()
    }
    // 2. 根据筛选条件获取房源列表
    getHouseList = async () => {
        const { status, data: { list } } = await getListByFilters(this.cityId, this.filters)
        if (status === 200) {
            this.setState({
                list
            })
        }
    }
    // 行渲染模板
    rowRenderer = ({
        key,
        index,
        isScrolling,
        isVisible,
        style,
    }) => {
        return (
            <div key={key} style={style} >
                {index}
            </div>
        );
    }
    render() {
        return (
            <div className={styles.root}>
                {/* 条件筛选栏 */}
                <Filter onFilter={this.onFilter} />
                {/* 列表 */}
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            rowCount={this.state.list.length}
                            rowHeight={160}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
}
