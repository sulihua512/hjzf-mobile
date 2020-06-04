import React from 'react'

import { Flex, Toast } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { getCurCity } from '../../utils'
import { getListByFilters } from '../../utils/api/house'
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import HoustItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/axios'
import NoHouse from '../../components/NoHouse'

export default class HouseList extends React.Component {
    state = {
        // 房源列表数据
        list: [],
        // 列表数据的总条数
        count: 0
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
        const { status, data: { list, count } } = await getListByFilters(this.cityId, this.filters)
        if (status === 200) {
            if (count > 0) {
                Toast.success(`成功获取到${count}条房源数据`, 2)
            }
            this.setState({
                list,
                count
            })
        }
    }

    // 判断当前行数据是否就位
    isRowLoaded = ({ index }) => {
        const { list } = this.state;
        return !!list[index];
    }

    // 核心：加载更多数据
    // fetch window上携带的
    loadMoreRows = ({ startIndex, stopIndex }) => {
        // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
        //     .then(response => {
        //         // Store response data in list...
        //     })
        return getListByFilters(this.cityId, this.filters, startIndex, stopIndex).then((res) => {
            console.log(res)
            // 做响应式
            if (res.status === 200) {
                this.setState({
                    count: res.data.count,
                    list: [...this.state.list, ...res.data.list]
                })
            }
        })
    }
    // 行渲染模板
    rowRenderer = ({
        key,
        index,
        isScrolling,
        isVisible,
        style,
    }) => {
        // 当前行row的数据
        const { list } = this.state;
        const item = list[index];
        // 处理item暂无数据的情况
        // if (!item) {
        //     return null
        // }
        if (!item) {
            return (
                <div style={style} key={key}>
                    <p className={styles.loading}></p>
                </div>
            )
        }
        // 处理图片传递的key
        item.src = `${BASE_URL}${item.houseImg}`
        return (
            <HoustItem onClick={() => {
                // 跳转到详情
                this.props.history.push(`/detail/${item.houseCode}`)
            }} {...item} key={key} style={style} />
        );
    }

    // 渲染房源列表
    renderHouseList = () => {
        const { count } = this.state
        return count !== 0 ? <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={this.state.count}
        >
            {({ onRowsRendered, registerChild }) => (
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className={styles.houseList}
                            width={width}
                            height={height}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowCount={this.state.count}
                            rowHeight={130}
                            rowRenderer={this.rowRenderer}
                        />
                    )}
                </AutoSizer>
            )
            }
        </InfiniteLoader > : <NoHouse>暂无房源数据!</NoHouse>
    }
    render() {
        return (
            <div className={styles.root}>
                {/* 条件筛选栏 */}
                <Filter onFilter={this.onFilter} />
                {/* 列表 */}
                {this.renderHouseList()}
            </div>
        )
    }
}
