import React, { Component } from 'react';
import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGroups, getNews } from '../../utils/api/home'
import Navs from '../../utils/navConf'
// import './index.css'
import './index.scss'
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile';
import { getCurrCity } from '../../utils/api/city';


/* 
    默认首页
*/
class Index extends Component {
    state = {
        // 轮播图图片数据
        swiper: [],
        // 控制自动播放
        isPlay: false,
        // 轮播图默认高度
        imgHeight: 212,
        // 租房小组数据
        groups: [],
        // 资讯数据
        news: [],
        // 搜索关键字
        keyword: '',
        // 当前定位城市
        currCity: {
            // 城市名字
            label: '--',
            // 城市id
            value: ''
        }
    }

    componentDidMount() {
        // this.getSwiper()
        // this.getGroups()
        // this.getNews()
        // 优化：
        this.loadAll()
        this.getCurCity()
    }
    getCurCity = () => {
        const { BMap } = window;
        const myCity = new BMap.LocalCity();
        myCity.get(async (result) => {
            const cityName = result.name;
            // console.log("当前定位城市:" + cityName);
            const { status, data } = await getCurrCity(cityName)
            if (status === 200) {
                this.setState({
                    currCity: data
                })
            }
        });
    }
    // 获取首页所有接口数据
    loadAll = async () => {
        const [swiper, group, news] = await Promise.all([getSwiper(), getGroups(), getNews()])
        // console.log('1. 获取首页所有数据', res)
        // 2. 批量做响应式
        if (swiper.status === 200) {
            this.setState({
                swiper: swiper.data,
                groups: group.data,
                news: news.data
            }, () => {
                this.setState({
                    // 轮播图已经有数据了
                    isPlay: true
                })
            })
        }
    }

    // 渲染轮播图组件
    renderCarousel = () => {
        return (
            <Carousel
                autoplay={this.state.isPlay}
                infinite
            >
                {this.state.swiper.map(val => (
                    <a
                        key={val.id}
                        href="http://itcast.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`${BASE_URL}${val.imgSrc}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // 触发了一个自适应高度的事件
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }

    // 渲染栏目导航
    renderNavs = () => {
        return (
            <Flex className="nav">
                {
                    Navs.map((item) => {
                        return (
                            <Flex.Item onClick={() => {
                                this.props.history.push(item.path)
                            }} key={item.id}>
                                <img src={item.img} alt="nav" />
                                <p>{item.title}</p>
                            </Flex.Item>
                        )
                    })
                }
            </Flex>
        )
    }

    // 渲染租房小组
    renderGroup = () => {
        return (
            <div className="group">
                <Flex className="group-title" justify="between">
                    <h3>租房小组</h3>
                    <span>更多</span>
                </Flex>
                <Grid data={this.state.groups}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={dataItem => (
                        <Flex className="grid-item" justify="between">
                            <div className="desc">
                                <h3>{dataItem.title}</h3>
                                <p>{dataItem.desc}</p>
                            </div>
                            <img src={`${BASE_URL}${dataItem.imgSrc}`} alt="" />
                        </Flex>
                    )}
                />
            </div>
        )
    }

    // 渲染资讯
    renderNews = () => {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`${BASE_URL}${item.imgSrc}`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }


    // 渲染顶部导航
    renderTopNav = () => {
        return (
            <Flex justify="around" className="topNav">
                <div className="searchBox">
                    <div className="city" onClick={() => {
                        this.props.history.push('/cityList')
                    }}>
                        {this.state.currCity.label}<i className="iconfont icon-arrow" />
                    </div>
                    <SearchBar
                        value={this.state.keyword}
                        onChange={(v) => this.setState({ keyword: v })}
                        placeholder="请输入小区或地址"
                    />
                </div>
                <div className="map" onClick={() => this.props.history.push('/map')}>
                    <i key="0" className="iconfont icon-map" />
                </div>
            </Flex>
        )
    }

    render() {
        return (
            <div className="indexBox">
                {/* 轮播图 */}
                {this.renderCarousel()}

                {/* 栏目导航 */}
                {this.renderNavs()}

                {/* 租房小组 */}
                {this.renderGroup()}

                {/* 新闻资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>

                {this.renderTopNav()}

            </div >
        )
    }
}
export default Index;