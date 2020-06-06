import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurCity } from '../../../utils/index'
import { getCommunityByKey } from '../../../utils/api/city'
import styles from './index.module.css'


export default class Search extends Component {

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  async componentDidMount() {
    // 获取城市ID
    const { value } = await getCurCity();
    this.cityId = value;
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }
  // 处理搜索 
  handlerSea = (val) => {
    // 去空格
    let _val = val.trim();
    if (_val) {
      this.setState({
        searchTxt: _val
      }, async () => {
        // 根据关键词查询结果
        const { status, data } = await getCommunityByKey(this.cityId, _val)
        if (status === 200) {
          this.setState({
            tipsList: data
          })
        }
      })
    } else {
      this.setState({
        searchTxt: '',
        tipsList: []
      })
    }
  }
  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.handlerSea}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
