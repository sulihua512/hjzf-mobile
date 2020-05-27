import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
// 导入组件页面
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound';

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
          {/* 404页面 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
