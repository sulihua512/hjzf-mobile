import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

import { getFilterData } from '../../../../utils/api/house'
import { getCurCity } from "../../../../utils/index";
// 初始化数据（默认数据）
// 根据type定义选中状态
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
// 筛选器当前选中的值
const selectedVal = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}
export default class Filter extends Component {
  // 定义状态数据
  state = {
    // 过滤器title选中状态
    titleSelectedStatus: { ...titleSelectedStatus },
    openType: ''
  }
  // 当前选中筛选器条件
  selectedVals = { ...selectedVal }
  componentDidMount() {
    this.getFilters()
  }
  // 获取过滤器条件数据
  getFilters = async () => {
    // 当前定位城市id
    const { value } = await getCurCity()
    const { status, data } = await getFilterData(value)
    if (status === 200) {
      // state中只存放和页面刷新有关的数据，所以数据应该存放在this实例上
      this.filterDates = data
      // console.log(this.filterDates)
    }
  }
  // 父组件提供修改状态数据的方法
  onTitleClick = (type) => {
    this.setState({
      titleSelectedStatus: { ...titleSelectedStatus, [type]: true },
      openType: type
    })
  }
  // 控制前三个过滤器内容显示
  isShowPicker = () => {
    const { openType } = this.state;
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }
  // 确定的时候=》关闭前三个菜单的内容
  onOk = (selectedVal) => {
    // console.log('点击ok，传递过来的值：', selectedVal)
    // 存储当前选中的值
    const { openType } = this.state;
    this.selectedVals[openType] = selectedVal
    console.log('当前选中的筛选器条件', this.selectedVals)
    this.setState({
      openType: '',
      // 处理筛选器是否有选中高亮状态
      titleSelectedStatus: this.handleSel()
    }, () => {
      // 处理选择的数据
      // const res = this.handerFilterData()
      // console.log(res)
      this.props.onFilter(this.handerFilterData())
    })
  }
  handleSel = () => {
    // 新的高亮状态
    const newStatus = {}
    // 遍历存储的筛选条件数据
    Object.keys(this.selectedVals).forEach((item) => {
      // 获取对应的筛选条件数据
      const cur = this.selectedVals[item];
      // 判断是否有选中的值
      if (item === 'area' && (cur[1] !== "null" || cur[0] === 'subway')) {
        newStatus[item] = true
      } else if (item === 'mode' && cur[0] !== 'null') {
        newStatus[item] = true
      } else if (item === 'price' && cur[0] !== 'null') {
        newStatus[item] = true
      } else if (item === 'more' && cur.length) {
        //todo:等待处理
        newStatus[item] = true
      } else {
        newStatus[item] = false
      }
    })
    return newStatus;
  }
  // 取消的时候=》关闭前三个菜单的内容
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }
  // 渲染前三个筛选器的方法
  renderPicker = () => {
    if (this.isShowPicker()) {
      // 根据openType值，传递对应的数据给picker组件
      const { area, subway, rentType, price } = this.filterDates
      // 获取当前点击的opentype
      const { openType } = this.state;
      // picker的数据源
      let data, col = 1;
      // 获取当前点击picker上一次选择的值
      let lastSel = this.selectedVals[openType]
      // console.log('111', lastSel)
      switch (openType) {
        case 'area': data = [area, subway]; col = 3;
          break;
        case 'mode': data = rentType;
          break;
        case 'price': data = price;
          break;
        default:
          break;
      }
      return (
        <FilterPicker
          key={openType}
          value={lastSel}
          data={data}
          col={col}
          onCancel={this.onCancel}
          onOk={this.onOk} />
      )
    }
    return null
  }
  // 渲染第四个筛选器
  renderMore = () => {
    const { openType } = this.state;
    if (openType === 'more') {
      // 获取more筛选器的数据
      const { characteristic, oriented, roomType, floor } = this.filterDates;
      let data = { characteristic, oriented, roomType, floor }
      return (
        <FilterMore data={data} value={this.selectedVals[openType]} onCancel={this.onCancel}
          onOk={this.onOk} />
      )
    }
  }
  // 处理列表接口需要的数据格式(后台)
  handerFilterData = () => {
    // 获取存储的筛选器数据
    const { area, mode, price, more } = this.selectedVals
    // 定义一个变量：存储处理的数据
    const filterDate = {}
    // 处理第一个筛选器
    // 第一个筛选器比较特殊：二选一
    let akey = area[0], aval;
    // 1. 根据数组长度处理
    if (area.length === 2) {
      // 2. 数组长度是2
      aval = area[1]
    } else {
      // 3. 数组长度是3
      if (area[2] === 'null') {
        // 3.1 第三个没选择条件
        aval = area[1]
      } else {
        // 3.2 第三个选了条件
        aval = area[2]
      }
    }
    // 4 .
    filterDate[akey] = aval
    // 5. mode
    filterDate.rentType = mode[0];
    // 6. price 
    filterDate.price = price[0];
    // 7. more
    filterDate.more = more.join(',');
    // 8. 返回处理完的数据
    return filterDate
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? <div className={styles.mask} onClick={this.onCancel} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={this.state.titleSelectedStatus} onTitleClick={this.onTitleClick} />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderMore()}
        </div>
      </div>
    )
  }
}
