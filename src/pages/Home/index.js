import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Index from '../Index/index';
import House from '../House/index';
import Profile from '../Profile/index';
import { TabBar } from 'antd-mobile';

import './index.css'
/* 
    首页
*/
class Home extends Component {
    state = {
        selectedTab: 'blueTab',
    };

    renderContent(pageText) {
        return (
            <h1>{pageText}</h1>
        );
    }
    render() {
        return (
            <div className="home">
                {/* <Link to="/home/index">index</Link>
                <Link to="/home/house">house</Link>
                <Link to="/home/profile">profile</Link> */}

                {/* 二级路由的配置 */}
                {/* 默认首页 */}
                <Route path="/home/index" component={Index} />
                {/* 列表找房 */}
                <Route path="/home/house" component={House} />
                {/* 个人中心 */}
                <Route path="/home/profile" component={Profile} />


                <div className='tabBox'>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        <TabBar.Item
                            title="Life"
                            key="Life"
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selected={this.state.selectedTab === 'blueTab'}
                            badge={1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                            data-seed="logId"
                        >
                            {this.renderContent('Life')}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="Koubei"
                            key="Koubei"
                            badge={'new'}
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab',
                                });
                            }}
                            data-seed="logId1"
                        >
                            {this.renderContent('Koubei')}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="Friend"
                            key="Friend"
                            dot
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                            {this.renderContent('Friend')}
                        </TabBar.Item>

                    </TabBar>
                </div>
            </div >
        )
    }
}
export default Home;