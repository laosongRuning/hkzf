import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Index from '../Index/index'
import House from '../House/index'
import Profile from '../Profile/index'
import { TabBar } from 'antd-mobile'
import tabItems from '../../utils/tabbarconfig'
import './index.css'



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 默认选中
            selectedTab: this.props.location.pathname,
            //fullScreen: true, //控制全屏显示
        }
    }
    componentDidMount() {
        // 监听路由变化
        // this.unlisten= this.props.history.listen((e) => {
        //     // e 为location信息对象
        //     if (e.pathname !== this.state.selectedTab) {
        //         this.setState({
        //             selectedTab: e.pathname
        //         })
        //     }
        // })
        this.listenRouter()
    }
    // 监听路由变化
    listenRouter=() => {
        this.unlisten= this.props.history.listen((e) => {
            // e 为location信息对象
            if (e.pathname !== this.state.selectedTab) {
                this.setState({
                    selectedTab: e.pathname
                })
            }
        })
    }
    // 解绑props.history路由监听事件
    componentWillUnmount () {
        this.unlisten()
    }
    // 根据菜单配置渲染tabBar的items
    renderTabBarItems = () => {
        return tabItems.map((item) => {
            return (
                <TabBar.Item
                    title={item.title}
                    key={item.path}
                    icon={
                        <i className={`iconfont ${item.icon}`} />
                    }
                    selectedIcon={<i className={`iconfont ${item.icon}`} />}
                    selected={this.state.selectedTab === item.path}
                    onPress={() => {
                        this.props.history.push(item.path);

                    }}
                />

            )
        })
    }


    render() {
        return (
            <div className="home">
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route exact path="/home" component={Index}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/profile" component={Profile}></Route>
                <div className="barBox">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        tabBarPosition="bottom"
                        noRenderContent={true}
                    >
                        {
                            this.renderTabBarItems()
                        }
                    </TabBar>
                </div >
            </div>
        )
    }
}

export default Home