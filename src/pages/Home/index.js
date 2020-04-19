import React from 'react'
import {Route,Link} from 'react-router-dom'
import Index from '../Index/index'
import House from '../House/index'
import Profile from '../Profile/index'

class Home extends React.Component{
    render () {
        return(
            <div className="home">
                <Link to="/home">默认首页</Link>
                <Link to="/home/house">列表找房</Link>
                <Link to="/home/profile">个人中心</Link>
                <Route exact path="/home" component={Index}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/profile" component={Profile}></Route>
            </div>
        )
    }
}

export default Home