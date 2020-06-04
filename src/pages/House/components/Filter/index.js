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
    const res = this.handleSel()
    console.log(res)
    this.setState({
      openType: '',
      // 处理筛选器是否有选中高亮状态
      titleSelectedStatus: this.handleSel()
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
      } else if (item === 'more') {
        //todo:等待处理
        newStatus[item] = false
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
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
