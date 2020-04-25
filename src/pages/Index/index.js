import React from 'react'
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile'
import { BASE_URL } from '../../utils/axios'
// import { getCityInfo } from '../../utils/api/city'
import { getSwiper, getGroup, getNews } from '../../utils/api/Home/index'
import { getCurCity } from '../../utils/index'
// 导入栏目导航的数据
import navs from '../../utils/navs'
import './index.scss'
// import axios from 'axios'
class Index extends React.Component {
  state = {
    currCity: {
      label: '--',
      value: ''
    },
    // 咨询列表数据
    news: [],
    // 宫格数据
    groupListData: [],
    // 走马灯数据源
    data: [],
    imgHeight: 176,
    // 控制自动播放属性
    isPlay: false,
    // 顶部关键字
    keyword: ''
  }
  componentDidMount() {
    // this.getSwiperData()
    // this.getGroupData()
    // this.getNewsData()
    this.getAllData()
    this.getCurrCity()
  }
  // Promise.all 封装获取接口数据方法
  getAllData = async () => {
    try {
      const methods = [getSwiper(), getGroup(), getNews()];
      let res = await Promise.all(methods);
      // console.log('all datas:', res);
      this.setState({
        data: res[0].data,
        groupListData: res[1].data,
        news: res[2].data
      }, () => {
        this.setState({
          aplay: true
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 获取当前城市信息
  // getCurrCity = () => {
  //   // 使用百度地图LocalCity类获取当前城市名字
  //   const myCity = new window.BMap.LocalCity();
  //   myCity.get(async (result) => {
  //     // 根据百度地图获取到城市名字，调用后台接口获取当前城市的详细数据
  //     let res = await getCityInfo(result.name);
  //     console.log(res);
  //     // 显示到页面上
  //     res.status === 200 && this.setState({
  //       currCity: res.data
  //     })
  //   });
  // }
  // 获取当前城市信息
  async getCurrCity() {
    let data = await getCurCity();
    this.setState({
      currCity: data
    }, () => {
      this.getAllData();
    })

  }


  // 获取走马灯数据
  // getSwiperData = async () => {
  //   const { status, data } = await getSwiper()
  //   // console.log(data)
  //   if (status === 200) {
  //     this.setState({
  //       data,
  //     }, () => {
  //       this.setState({
  //         isPlay: true
  //       })
  //     })
  //   }
  // }
  // 渲染走马灯ui
  renderCarousel = () => {
    return (
      // 走马灯
      <Carousel
        autoplay={this.state.isPlay}
        autoplayInterval={2000}
        infinite
      >
        {this.state.data.map(val => (
          <a
            key={val.id}
            href="http://www.itheima.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, background: '#fff' }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // 屏幕适配
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>

    )
  }


  // flex 布局展示
  showFlex = () => {
    return (
      <Flex className="nav">
        {
          navs.map((item) => <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </Flex.Item>)
        }
      </Flex>
    )
  }


  // 获取宫格小组数据
  // getGroupData = async () => {
  //   const { status, data } = await getGroup()
  //   // console.log(data)
  //   if (status === 200) {
  //     this.setState({
  //       groupListData: data
  //     })
  //   }
  // }
  // 渲染宫格小组ui 空标签的使用
  showGroup = () => {
    return (
      <>
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        <Grid
          data={this.state.groupListData}
          columnNum={2}
          // 关闭默认正方形
          square={false}
          hasLine={false}
          renderItem={item => {
            return (
              // item结构
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )
          }}
        />
      </>
    )
  }


  // 渲染资讯列表UI
  showNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  // 获取资讯列表数据
  // getNewsData = async () => {
  //   const { status, data } = await getNews()
  //   // console.log(data)
  //   if (status === 200) {
  //     this.setState({
  //       news: data
  //     })
  //   }
  // }



  // 渲染顶部搜索
  showTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={() => {
            this.props.history.push('/citylist')
          }}>
            {this.state.currCity.label}
            <i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={() => {
          this.props.history.push('/map')
        }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  render() {
    return (
      <div>
        {/* 顶部搜索 */}
        {this.showTopNav()}
        {/* 走马灯 */}
        {this.renderCarousel()}
        {/* // Flex 布局 */}
        {this.showFlex()}
        {/* 租房宫格展示 */}
        <div className="group">
          {this.showGroup()}
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.showNews()}</WingBlank>
        </div>
        {/*  */}
      </div>
    )
  }
}

export default Index