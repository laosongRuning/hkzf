import React, { lazy, Suspense } from 'react';
// import { } from 'antd-mobile';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
// import CityList from './pages/CityList'
// import Map from './pages/Map'
// import NotFound from './pages/NotFound'
// import Login from './pages/Login'
// import HouseDetail from './components/HouseDetail'

// import Rent from './pages/Rent'
// import RentAdd from './pages/Rent/Add'
// import RentSearch from './pages/Rent/Search'
// 懒加载写法
const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const HouseDetail = lazy(() => import('./components/HouseDetail'))
const Rent = lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))

function App() {
  return (
    <Router className="App">
      <Suspense fallback={<center>加载中。。。</center>}>
        {/* <Link to="/home">主页</Link>
      <Link to="/citylist">城市列表</Link>
      <Link to="/map">地图</Link> */}
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={CityList}></Route>
          <Route path="/map" component={Map}></Route>
          <Route path="/login" component={Login}></Route>
          {/* 设置一个房源详情的路由 */}
          <Route path="/detail/:id" component={HouseDetail} />
          {/* 发布房源相关 */}
          <Route path="/rent" exact component={Rent} />
          <Route path="/rent/add" component={RentAdd} />
          <Route path="/rent/search" component={RentSearch} />
          {/* 配置404页面 */}
          <Route component={NotFound}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
