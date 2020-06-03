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
export default class Filter extends Component {
  // 定义状态数据
  state = {
    // 过滤器title选中状态
    titleSelectedStatus: { ...titleSelectedStatus },
    openType: ''
  }
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
  onOk = () => {
    this.setState({
      openType: ''
    })
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
        <FilterPicker data={data} col={col} onCancel={this.onCancel} onOk={this.onOk} />
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
