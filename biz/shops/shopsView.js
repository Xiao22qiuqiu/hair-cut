import React, {PropTypes, Component} from 'react'
import {Link, IndexLink,browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {Button,Tabs, WhiteSpace,NavBar,Icon, Flex,List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';    //react-sticky - React最强大可用的粘性库
import Config from 'config/Config';
import Util from 'util';
import {StarRange} from 'Widget';  //取出星星组件
import Style from './shopsLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
import moment from 'moment';
const Item = List.Item;
const Brief = Item.Brief;


/**
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("shops")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.shops;
    }
     tabs = [
        { title: '商品信息' },
        { title: '用户评论' },
        { title: '商家信息' },
    ];

    componentDidMount() {
        let id=this.props.location.query.id
        this.stores.getshop(id);
    }
    //点赞星星数
     starRange(score,clas) {
        let starArr = [] ,number=Number(score),max = 5, className=clas;
        let num = Math.floor(number);
        for(let i = 0; i < number; i++) {
            starArr.push(<div className="star-icon"  key={'star'+i}></div>);
        }
        if (number % 1 > 0) {
            starArr.push(<div className="half-star-icon" key={'banstar'+num}></div>);
        }
        let length = starArr.length;
        for(let i = 0; i < max - length; i++) {
            starArr.push(<div className="grey-star-icon" key={'greystar'+i}></div>);
        }

        return (
            <div className={`star-range-widget ${className}`}>
                {starArr}
            </div>
        )
    }

    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }


    render() {
        let {userList,commentList}=this.stores.state;

        const TabExample = () => (
            <div className="tabStyle">
                <WhiteSpace />
                <StickyContainer>
                    <Tabs tabs={this.tabs}
                          initalPage={'t1'}
                          renderTabBar={this.renderTabBar}
                        >
                        <div className="tabCom">
                            <div className="youhui">
                                <div className="shopsList">
                                    <ul key='hairlist'>
                                        {
                                            userList.itemList && userList.itemList.map((item, index) => {
                                                return (
                                                    <li className='pdt_item' key={index}>
                                                        <div className='pdt_cover'>
                                                            <img src={'data:image/png;base64,'+item.url1} />
                                                        </div>

                                                        <div className='pdt_infoBox'>
                                                            <div className='pdt_info1'>{item.name}</div>
                                                            <div className='pdt_info2'>
                                                                <div className='pdt_discounts'>
                                                                    <span>商店价：{item.shopPrice}</span>
                                                                </div>
                                                            </div>
                                                            <div className='pdt_info2'>
                                                                <div className='pdt_discounts'>
                                                                    {/*<span class="price-symbol">¥</span>*/}
                                                                    <span  style={{color:'red'}}>门店价：{item.price}</span>
                                                                </div>
                                                            </div>
                                                            <div className='pdt_info2'>
                                                                <div className='pdt_discounts'>
                                                                    {userList.discount&&<span className='iconfont icon-dazheicon' style={{color:'#d4237a'}}>{userList.discount}</span>}
                                                                    {userList.coupon&&item.shopPrice>userList.moneyOff&&<span><span className='iconfont icon-youhui3' style={{color:'#FFD21F'}}></span>
                                                                    <span style={{color:'red',marginLeft:'8px'}}>减{userList.coupon}</span></span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='pdt_info_comment'>
                                                            <Button className="btn" onClick={()=>hashHistory.push('/newpayOrder?id='+item.id+'&name='+item.name+'&shopPrice='+item.shopPrice+'&shopId='+userList.id+'&shopName='+userList.shopName+'&discount='+userList.discount+'&coupon='+userList.coupon+'&moneyOff='+userList.moneyOff)}>购 买</Button>
                                                        </div>

                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tabCom">
                            <div className="pinglun">
                                <ul key='pinglun'>
                                    {
                                        commentList && commentList.map((item, index) => {
                                            return (
                                                <li className='box' key={index}>
                                                    <div className='users clearfix'>
                                                        <div className="userImg"><img src={'data:image/png;base64,'+item.avatarUrl} /></div>
                                                        <div className="userName">{item.userName}</div>
                                                        {this.starRange(item.score,'scoreStyle')}

                                                    </div>
                                                    <div className='time'>
                                                        <span style={{marginRight:'20px'}}>{moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                                                        <span>商品名称：{item.itemName}</span>
                                                    </div>
                                                    <div className='remark'>
                                                        <span>{item.remark}</span>
                                                    </div>
                                                    <div>
                                                        {item.commentImage&&item.commentImage.map((x,i)=>{
                                                            return (
                                                                <div className="pics" key={i+'img'}>
                                                                    <img className="pic" src={'data:image/png;base64,'+x} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </div>
                        <div className="tabCom">
                            <div className="messages">
                                <List renderHeader={() => '商家环境'} className="my-list">
                                    <div className="head">
                                        {userList.environmentImageList&&userList.environmentImageList.map((x,i)=>{
                                            return (<div key={i}>
                                                <img src={'data:image/png;base64,'+x} alt=""/>
                                            </div>)
                                        })}

                                    </div>
                                </List>
                                <List renderHeader={() => '美发师信息'} className="my-baber">
                                    <ul>
                                        {userList.shopBarberList&&userList.shopBarberList.map((x,i)=>{
                                            return (<div key={i} className="warp">
                                                    <li className="bar-line"></li>
                                                    <li className="barber">
                                                        <div className="con_left">
                                                            <img src={x.barberImage} alt=""/>
                                                            <div></div>
                                                        </div>
                                                        <div className="con_center">
                                                            <div><span className="right_r">姓名:</span>{x.name}</div>
                                                            <div><span className="right_r">工作经验:</span>{x.times}</div>
                                                            <div><span className="right_r">总预约人数:</span>{x.total}</div>
                                                        </div>
                                                        <div className="con_right">
                                                            <div><span className="right_r">等级:</span>{x.grade}</div>
                                                            <div><span className="right_r">级别费用:</span>{x.appointTips}</div>
                                                            <div><span className="right_r">今日预约人数:</span>{x.todayTotal}</div>
                                                        </div>
                                                    </li>
                                                    <li className="time">
                                                        <div>
                                                            <span className="right_r">工作时间:<span style={{marginLeft:'8px',fontSize:'24px',color:'#999'}}>{x.workTime}</span></span>
                                                        </div>
                                                    </li>
                                                </div>
                                            )
                                        })}
                                    </ul>
                                </List>
                            </div>
                        </div>
                    </Tabs>
                </StickyContainer>
                <WhiteSpace />
            </div>
        );

        return (
            <div className="shops">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >店铺介绍
                </NavBar>
                <div className="header">
                    <div className="shop_left">
                        <img src={'data:image/png;base64,'+userList.shopImage} alt=""/>
                    </div>
                    <div className="shop_right">
                        <div className="head">
                            <span className="name">{userList.shopName}</span>
                            <span className='iconfont icon-faxian6'>{userList.come}</span>
                        </div>
                        <div>
                            <span className='iconfont icon-ditu3' style={{color:'#1296db'}}></span>
                            <span className='iconfont'>{userList.address}</span>
                        </div>
                        <div>
                            <span className='iconfont icon-dianhua' style={{color:'#1296db'}}>预约电话</span>
                            <span className='iconfont'>{userList.phone}</span>
                        </div>
                    </div>
                </div>

                <TabExample />
                <div >
                    <div className="foot"></div>
                </div>
                <TabBar selectedTab='shopsTab' />
            </div>
        );
    }
}

module.exports = Test;
