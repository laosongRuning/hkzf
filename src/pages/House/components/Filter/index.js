import React, { Component } from 'react'

// 过滤器的头
import FilterTitle from '../FilterTitle'
// picker（条件选择）
import FilterPicker from '../FilterPicker'
// 更多条件选择
import FilterMore from '../FilterMore'
import { getFilters } from '../../../../utils/api/House'
import styles from './index.module.css'
import { getCurCity } from '../../../../utils'

// 过滤器的title默认的高亮状态
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
// 选中数据维护(测试)
const selectedValues = {
  // 默认值没有选中
  area: ['area', 'null'],
  // area: ['area', 'AREA|69cc5f6d-4f29-a77c', 'AREA|73aa1890-64c7-51d9'],
  mode: ['null'],
  // mode: ['true'],
  price: ['null'],
  // price: ['PRICE|1000'],
  more: []
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
    // 处理高亮
    let newSel = this.handlerSel()
    this.setState({
      openType: '',
      titleSelectedStatus: newSel
    })
  }

  // 确定选择过滤条件
  onOk = (val) => {
    // console.log(val)
    // 存储到组件实例上
    let { openType } = this.state
    this.selectedValues[openType] = val
    // 处理高亮
    let newSel = this.handlerSel();
    this.setState({
      openType: '',
      titleSelectedStatus: newSel
    }, () => {
      // 处理筛选条件数据
      this.handlerFilters(this.selectedValues)
    })
  }
  componentDidMount() {
    this.getFilterData()
    this.selectedValues = { ...selectedValues }
  }

  // 获取筛选条件的数据
  getFilterData = async () => {
    let curCity = await getCurCity()
    let { value } = curCity
    const res = await getFilters(value)
    let { status, data } = res
    if (status === 200) {
      this.filterData = data
      // console.log(this.filterData)
    }

  }
  // 渲染picker，并提供对应的数据
  renderPicker = () => {
    if (this.isShowPicker()) {
      // 获取对应picker的数据
      const { area, subway, rentType, price } = this.filterData
      const { openType } = this.state
      let data, clos = 1;
      // 当前选中的值
      let curval = this.selectedValues[openType]
      switch (openType) {
        case 'area':
          data = [area, subway]
          clos = 3
          break;
        // case 'area':
        //   data = [area, subway]
        //   break;
        case 'mode':
          data = rentType
          break
        case 'price':
          data = price
          break
        default:
          break;
      }
      return <FilterPicker
        // 传递当前选中的筛选数据
        value={curval}
        data={data}
        clos={clos}
        key={openType}
        onCancel={this.onCancel}
        onOk={this.onOk} />
    } else {
      return null
    }
  }

  // 处理筛选器选中后有无条件的高亮状态
  handlerSel = () => {
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = {};
    // 遍历selectedValues
    Object.keys(this.selectedValues).forEach((key) => {
      // 获取当前过滤器选中值=》数组
      let cur = this.selectedValues[key];
      // 判断数组的值
      if (
        (key === 'area') && (cur[1] !==
          "null" || cur[0] === 'subway')) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && cur[0] !== "null") {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && cur[0] !== "null") {
        newTitleSelectedStatus[key] = true
      }
      // 后续处理
      else if (key === 'more' && cur.length !== 0) {
        // 更多选择项 FilterMore 组件情况
        newTitleSelectedStatus[key] = true
      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    return newTitleSelectedStatus
  }

  renderFilterMore = () => {
    const { openType } = this.state;
    if (openType === 'more') {
      console.log(this.filterData);
      // 传递筛选器数据
      const { roomType, oriented, floor, characteristic } = this.filterData;
      const data = { roomType, oriented, floor, characteristic }
      return <FilterMore
        data={data}
        value={this.selectedValues[openType]}
        onOk={this.onOk}
        onCancel={this.onCancel}
      />
    }
    return null
  }

  // 处理后台需要的筛选条件数据
  handlerFilters = (selectedValues) => {
    // 筛选条件数据
    const { area, mode, price, more } = selectedValues;
    // 组装数据
    const filters = {};
    // area | subway
    let areaKey = area[0], aval;
    if (area.length === 2) {
      aval = area[1]
    } else {
      if (area[2] !== 'null') {
        aval = area[2]
      } else {
        aval = area[1]
      }
    }
    filters[areaKey] = aval;
    // mode
    filters.rentType = mode[0]
    // price
    filters.price = price[0]
    // more
    filters.more = more.join(',')
    console.log('filters:', filters);
    return filters
  }



  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 前三个菜单的遮罩层 */}
          {
            this.isShowPicker() ? <div className={styles.mask} onClick={this.onCancel} /> : null
          }
          {/* 标题栏 */}
          <FilterTitle onTitleClick={this.onTitleClick} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
          {
            this.renderFilterMore()
          }
        </div>
      </div>
    )
  }
}
