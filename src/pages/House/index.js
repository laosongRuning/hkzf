import React from 'react'

// import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式  styles名字随便起   from './xxx.module.css'(module是固定写法)
import styles from './index.module.css'
import { getHouseList } from '../../utils/api/House'
import { getCurCity } from '../../utils'
import { List, AutoSizer } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/axios'
import { renderIntoDocument } from 'react-dom/test-utils'

export default class HouseList extends React.Component {
  state = {
    // 房屋列表数据
    list: []
  }

  // 渲染列表项
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { list } = this.state
    const item = list[index]
    // 处理暂时没有加载到数据情况
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    // 处理图片地址
    item.src = BASE_URL + item.houseImg;
    // console.log(item);
    return <HouseItem {...item} key={key} style={style} />
  }
  async componentDidMount() {
    const { value } = await getCurCity()
    this.cityId = value
    // 默认调用一次 触发时机，每次用户选择过滤器确定的时候
    this.getHouseList()
  }
  // 父组件提供接收数据方法
  onFilter = async (filters) => {
    this.filters = filters;
    this.getHouseList()
  }
  // 获取列表数据
  getHouseList = async () => {
    let res = await getHouseList(this.cityId, this.filters, 1, 20)
    console.log(res)
    let { status, data: { list } } = res
    if (status === 200) {
      this.setState({
        list,
      })
    }
  }

  //  渲染列表
  renderHouseList = () => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={styles.houseList}
            height={height}
            rowCount={this.state.list.length}
            rowHeight={130}
            rowRenderer={this.renderHouseItem}
            width={width}
          />
        )}
      </AutoSizer>
    )
  }



  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果：列表 */}
        {/* 列表 */}
        {
          this.renderHouseList()
        }
      </div>
    )
  }
}
