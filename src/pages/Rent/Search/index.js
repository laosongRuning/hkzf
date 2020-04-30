import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurCity } from '../../../utils'

import styles from './index.module.css'

export default class Search extends Component {

  state = {
    // 搜索框的值
    searchTxt: '',
    // 小区列表数据
    tipsList: []
  }
  
  // 搜索框受控（双向绑定）
  handlerSearch=(val) => {
    let _val = val.trim()
    // 处理空的结果
    if(_val.length === 0) {
      return this.setState({
        searchTxt: ''
      })
    }
    this.setState({
      searchTxt:_val
    })
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

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.handlerSearch}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
