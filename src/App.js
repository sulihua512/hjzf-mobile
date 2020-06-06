import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 导入组件页面
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound';
import HouseDetail from './components/HouseDetail';
import Login from './pages/Login';
import Rent from './pages/Rent';
import RentAdd from './pages/Rent/Add';
import RentSearch from './pages/Rent/Search';

function App() {
  return (
    <div className="App">
      {/* 配置路由（一级路由） */}
      <Router>
        {/* <div className="nav">
          <Link to="/home">home</Link>
          <Link to="/cityList">cityList</Link>
          <Link to="/map">map</Link>
        </div> */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          {/* 首页 */}
          <Route path="/home" component={Home} />
          {/* 城市列表 */}
          <Route path="/cityList" component={CityList} />
          {/* 地图找房 */}
          <Route path="/map" component={Map} />
          {/* 房源详情 */}
          <Route path="/detail/:id" component={HouseDetail} />
          {/* 登录 */}
          <Route path="/login" component={Login} />
          {/* 发布房源 */}
          {/* 已发布房源的列表 */}
          <Route path="/rent" exact component={Rent} />
          {/* 发布房源页面 */}
          <Route path="/rent/add" component={RentAdd} />
          {/* 搜索发布的房源所在的小区的路由 */}
          <Route path="/rent/search" component={RentSearch} />
          {/* /* 404页面 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
