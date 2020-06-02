import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

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
    titleSelectedStatus: { ...titleSelectedStatus }
  }

  // 父组件提供修改状态数据的方法
  onTitleClick = (type) => {
    this.setState({
      titleSelectedStatus: { ...titleSelectedStatus, [type]: true }
    })
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={this.state.titleSelectedStatus} onTitleClick={this.onTitleClick} />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
