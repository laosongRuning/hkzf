import React from 'react';
import { } from 'antd-mobile';
import { HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'
import HouseDetail from './components/HouseDetail'
function App() {
  return (
    <Router className="App">
      {/* <Link to="/home">主页</Link>
      <Link to="/citylist">城市列表</Link>
      <Link to="/map">地图</Link> */}
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        {/* 设置一个房源详情的路由 */}
        <Route path="/detail/:id" component={HouseDetail} />
        {/* 配置404页面 */}
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
