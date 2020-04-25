import React, { Component } from 'react'

// 过滤器的头
import FilterTitle from '../FilterTitle'
// picker（条件选择）
import FilterPicker from '../FilterPicker'
// 更多条件选择
import FilterMore from '../FilterMore'
import {getFilters} from '../../../../utils/api/House'
import styles from './index.module.css'
import { getCurCity } from '../../../../utils'

// 过滤器的title默认的高亮状态
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

export default class Filter extends Component {
  // 设置状态
  state = {
    titleSelectedStatus: { ...titleSelectedStatus },
    opentype: ''

  }
  onTitleClick = type => {
    // console.log(type)
    this.setState({
      titleSelectedStatus: { ...titleSelectedStatus, [type]: true },
      opentype: type
    })
  }


  // 是否显示前三个过滤器的picker组件内容
  isShowPicker = () => {
    const { openType } = this.state;
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }

  // 关闭前三个筛选器内容和遮罩层
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  // 确定选择过滤条件
  onOk = () => {
    this.setState({
      openType: ''
    })
  }


  // 获取筛选条件的数据
  getFilterData= async() => {
    let curCity = await getCurCity()
    let {value} = curCity
    const res = await getFilters(value)
    let {status,data} = res
    if(status === 200) {
      this.filterData = data
    }

  }

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 前三个菜单的遮罩层 */}
          {
            this.isShow() ? <div className={styles.mask}  onClick={this.onCancel}/> : null
          }
          {/* 标题栏 */}
          <FilterTitle onTitleClick={this.onTitleClick} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {
            this.isShowPicker ? <FilterPicker onCancel={this.onCancel} onOk={this.onOk} /> : null
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
