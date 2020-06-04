import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  constructor(props) {
    super(props);
    console.log('初始化constructor，只执行一次');
  }
  state = {
    value: this.props.value
  }
  render() {
    const { onCancel, onOk, data, col } = this.props;
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.state.value} onChange={(val) => {
          // console.log('picker', val)
          this.setState({
            value: val
          })
        }} cols={col} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} onOk={() => {
          // 将选中的值传递给父组件（子-》父）
          onOk(this.state.value)
        }} />
      </>
    )
  }
}
