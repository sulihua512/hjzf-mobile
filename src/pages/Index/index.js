import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';
import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGroups, getNews } from '../../utils/api/home'
import Navs from '../../utils/navConf'
// import './index.css'
import './index.scss'
import { Grid, WingBlank } from 'antd-mobile';


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
        news: []
    }
    componentDidMount() {
        this.getSwiper()
        this.getGroups()
        this.getNews()
    }

    // 获取轮播图数据
    getSwiper = async () => {
        const { status, data } = await getSwiper()
        // console.log(res)
        if (status === 200) {
            // 响应式：修改轮播图的数据
            this.setState({
                swiper: data
            }, () => {
                this.setState({
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

    // 获取租房小组数据
    getGroups = async () => {
        const { status, data } = await getGroups()
        if (status === 200) {
            this.setState({
                groups: data
            })
        }
        // console.log(data)
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

    // 获取新闻资讯数据
    getNews = async () => {
        const { data, status } = await getNews()
        if (status === 200) {
            this.setState({
                news: data
            })
        }
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
            </div >
        )
    }
}
export default Index;