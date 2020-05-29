import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
// 导入二级路由页面
import Index from '../Index/index';
import House from '../House/index';
import Profile from '../Profile/index';
import './index.css'
// 导入tabBar配置数据
import tabItemData from '../../utils/tabBarConf'

/* 
    首页
*/
class Home extends Component {
    state = {
        // 当前选中标签
        selectedTab: this.props.location.pathname,
    };
    // 渲染tabBarItems的方法
    renderTabBar = () => {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                {tabItemData.map((item, index) =>
                    <TabBar.Item
                        title={item.title}
                        key={index}
                        icon={<i className={`iconfont ${item.icon}`} />
                        }
                        selectedIcon={
                            <i className={`iconfont ${item.icon}`} />
                        }
                        selected={this.state.selectedTab === item.path}
                        // 点击事件
                        onPress={() => {
                            this.props.history.push(item.path)
                            this.setState({
                                selectedTab: item.path,
                            });
                        }}
                    >
                    </TabBar.Item>
                )}
            </TabBar>
        )
    }
    render() {
        return (
            <div className="home">
                {/* 二级路由的配置 */}
                {/* 默认首页 */}
                <Route exact path="/home" component={Index} />
                {/* 列表找房 */}
                <Route path="/home/house" component={House} />
                {/* 个人中心 */}
                <Route path="/home/profile" component={Profile} />

                {/* 标签页组件 */}
                <div className='tabBox'>
                    {this.renderTabBar()}
                </div>
            </div >
        )
    }
}
export default Home;