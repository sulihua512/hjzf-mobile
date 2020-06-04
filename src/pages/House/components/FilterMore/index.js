import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 设置状态数据
  state = {
    selected: []
  }
  // 存储选中的条件：有就删除，没有就添加
  handerSel = (item) => {
    // 之前的选择
    const { selected } = this.state;
    const newSelected = [...selected];
    let index = newSelected.indexOf(item.value);
    if (index > -1) {
      // 表明有数据，就删除
      newSelected.splice(index, 1)
    } else {
      // 表明之前没有选择过
      newSelected.push(item.value)
    }
    // 拿到数据之后做响应式
    this.setState({
      selected: newSelected
    }, () => {
      console.log(this.state.selected)
    })
  }
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map((item) => <span onClick={() => {
      this.handerSel(item)
    }} key={item.value} className={[styles.tag, this.state.selected.includes(item.value) ? styles.tagActive : ''].join(' ')}>{item.label}</span>)
  }

  render() {
    // 从父组件传过来的数据中解构出onCancel和onOk方法
    const { onCancel, onOk, data } = this.props;
    // console.log(data)
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancel} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(data.characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onCancel={onCancel} onOk={() => {
          // 将选中的值传递给父组件（子-》父）
          onOk(this.state.selected)
        }} />
      </div>
    )
  }
}
