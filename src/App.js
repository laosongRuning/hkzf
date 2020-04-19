import React from 'react';
import { } from 'antd-mobile';
import {BrowserRouter as Router, Route, Link, Switch,Redirect} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router className="App">
      <Link to="/home">主页</Link>
      <Link to="/citylist">城市列表</Link>
      <Link to="/map">地图</Link>
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        {/* 配置404页面 */}
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
