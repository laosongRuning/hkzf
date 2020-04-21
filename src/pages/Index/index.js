import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import { BASE_URL } from '../../utils/axios'
import { getSwiper } from '../../utils/api/Home'
// 导入栏目导航的数据
import navs from '../../utils/navs'
import './index.css'
// import axios from 'axios'
class Index extends React.Component {
  state = {
    // 走马灯数据源
    data: [],
    imgHeight: 176,
    // 控制自动播放属性
    isPlay: false
  }
  componentDidMount() {
    this.getSwiperData()
  }
  getSwiperData = async () => {
    const { status, data } = await getSwiper()
    // console.log(data)
    if (status === 200) {
      this.setState({
        data,
      }, () => {
        this.setState({
          isPlay: true
        })
      })
    }
  }
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
  showFlex = () => {
    return(
      <Flex className="nav">
        {
          navs.map((item) => <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
          <img src={item.img} alt=""/>
          <p>{item.title}</p>
        </Flex.Item>)
        }
      </Flex>
    )
  }
  render() {
    return (
      <div>
        {/* 走马灯 */}
        {this.renderCarousel()}
        {/* // Flex 布局 */}
        {this.showFlex()}
      </div>
    )
  }
}

export default Index