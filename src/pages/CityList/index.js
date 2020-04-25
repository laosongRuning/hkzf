import React from 'react'
import { getCityList, getCityHot } from '../../utils/api/city'
import { getCurCity, CRE_CITY, setSession } from '../../utils/index'
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'
import { NavBar, Icon, Toast } from 'antd-mobile'
class CityList extends React.Component {
    state = {
        cityList: {},
        cityIndex: [],
        // 当前位置的索引,激活索引样式状态
        activeIndex: 0
    }
    componentDidMount() {
        this.getCityList()
    }
    // 获取城市列表数据
    getCityList = async () => {
        const { status, data } = await getCityList()
        console.log(status,data)
        if (status === 200) {
            let { cityList, cityIndex } = this.formmatData(data)
            // 加入热门城市数据
            let { status: st, data: da } = await getCityHot()
            if (st === 200) {
                cityIndex.unshift('hot')
                cityList['hot'] = da
            }
            const res = await getCurCity()
            cityList['#'] = [res]
            cityIndex.unshift('#')
            this.setState({
                cityList,
                cityIndex
            })

        }
    }
    // 改造后台数据
    // 格式化城市列表数据
    formmatData = (data) => {
        let cityList = {}, cityIndex;
        data.forEach((item) => {
            // 截取首字母
            let first = item.short.slice(0, 1);
            // 判断对象中是否存在某个属性
            if (!(first in cityList)) {
                cityList[first] = [item]
            } else {
                cityList[first].push(item)
            }
        })
        cityIndex = Object.keys(cityList).sort()
        console.log('formated:', cityList, cityIndex);
        return {
            cityIndex,
            cityList
        }
    }

    // 格式化列表title
    // 格式化字母（处理热门城市和当前城市）
    formmatLetter(letter, first) {
        switch (letter) {
            case 'hot':
                return first ? '热' : '热门城市';
            case '#':
                return first ? '当' : '当前城市';
            default:
                return letter.toUpperCase();
        }
    }

    // 切换城市
    changeCity = (city) => {
        const hasData = ['北京', '上海', '广州', '深圳'];
        if (hasData.includes(city.label)) {
            setSession(CRE_CITY, JSON.stringify(city));
            this.props.history.goBack()
            // this.props.history.push('/')
        } else {
            Toast.info('该城市暂无房源数据！', 2)
        }
    }


    // 数据
    // 渲染列表项
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
    }) => {
        // 获取处理完的数据
        const { cityIndex, cityList } = this.state
        // 数据的键
        const letter = cityIndex[index]
        // 数据的值
        let item = cityList[letter]
        return (
            <div key={key} style={style} className="city-item">
                <div className="title">{this.formmatLetter(letter)}</div>
                {
                    item.map((item) => <div key={item.value} onClick={() => {
                        this.changeCity(item)
                    }}>{item.label}</div>)
                }
            </div>
        )
    }


    // 动态计算高度
    // 动态获取行高
    getRowheight = ({ index }) => {
        const { cityIndex, cityList } = this.state;
        let letter = cityIndex[index];
        // title高度+城市高度*城市个数
        return 36 + 50 * cityList[letter].length
    }


    // 渲染右侧索引
    renderCityIndex = () => {
        const { cityIndex,activeIndex } = this.state;
        return cityIndex.map((item, index) => {
            return (
                <li
                    key={item}
                    className="city-index-item"
                    onClick={() => {
                        // 点击的时候定位列表
                        this.refList.scrollToRow(index)
                    }}
                >
                    <span className={activeIndex === index ? 'index-active' : ''}>
                        {this.formmatLetter(item, true)}
                    </span>
                </li>
            )
        })
    }

    // 滚动列表触发(每次重新渲染列表后都会触发)
    onRowsRendered = ({ startIndex }) => {
        if (this.state.activeIndex !== startIndex) {
            // console.log(startIndex);
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    render() {
        return (
            <div className="cityList">
                {/* 导航返回 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    城市选择
                </NavBar>
                {/* 城市列表 */}
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            ref={(e) => { this.refList = e }}
                            scrollToAlignment="start"
                            onRowsRendered={this.onRowsRendered}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowheight}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>
                {/* 右侧索引列表 */}
                <ul className="city-index">
                    {this.renderCityIndex()}
                </ul>
            </div>
        )
    }
}

export default CityList