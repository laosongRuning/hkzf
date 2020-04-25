import React, { Component } from 'react'

// 过滤器的头
import FilterTitle from '../FilterTitle'
// picker（条件选择）
import FilterPicker from '../FilterPicker'
// 更多条件选择
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
