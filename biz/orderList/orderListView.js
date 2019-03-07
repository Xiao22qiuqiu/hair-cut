import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {Flex, Tabs, WhiteSpace, NavBar, Icon,Button} from 'antd-mobile';
import { tabs , StarRange} from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './orderListLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
import moment from 'moment';

/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("orderList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.orderList;
    }
    tabs = [
        { title: '全部' ,key:''},
        { title: '待支付',key:'1' },
        { title: '未使用',key:'2' },
        { title: '已完成' ,key:'3'},
        { title: '已取消' ,key:'4'},
    ];
    exact=<div>
        你是谁
    </div>
    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        this.getData();
    }
    //获取数据
    getData = () => {
        let status={
            key:''
        }
        if(this.props.location.query.status){
            status.key=this.props.location.query.status
        }
        this.onTabs(status);
    }
    onTabs=(index)=>{
        this.stores.getTabsIndex(index.key);
    }

    toClass=(text,name)=>{
        if(name=='class'){
            switch (text){
                case 1:
                    return 'unused'
                    break;
                case 2:
                    return 'unused'
                    break;
                case 3:
                    return'finished'
                    break;
                case 4:
                    return 'losted'
                    break;
            }
        }
        if(name=='status'){
            switch (text){
                case 1:
                    return '待支付'
                    break;
                case 2:
                    return'未使用'
                    break;
                case 3:
                    return'已完成'
                    break;
                case 4:
                    return '已取消'
                    break;
                case 5:
                    return '已终止'
                    break;
            }
        }


    }
    //取消订单
    cancelOrd=(id)=>{
        this.stores.cancelMod(id);
    }

    //完成订单，有后商家平台管理，这里只是模拟示范
    okOrd=(id)=>{
        this.stores.okMod(id);
    }


    render() {
        let {orderList}=this.stores.state;
        return (
            <div className="order">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >订单管理
                </NavBar>
                <Tabs tabs={this.tabs}
                      className="tabs"
                      onTabClick={e=>this.onTabs(e)}

                    />
                <div className="wrap">
                    {orderList&&orderList.map((x,i)=>{
                        return (<div className="content" key={x.id}>
                            <Flex className="head_ord">
                                <div className="head_left">
                                   <span style={{fontSize:'24px'}} onClick={()=>{hashHistory.push('/shops?id='+x.shopId)}}>{x.shopName}</span>
                                </div>
                                <div className={"commons "+this.toClass(x.status,'class')}>
                                    {this.toClass(x.status,'status')}
                                </div>
                            </Flex>
                            <Flex className="content">
                                <div className="Img_left">
                                        <Link to={'/payOrder?id='+x.id}><img src={'data:image/png;base64,'+x.itemImage} alt=""/></Link>
                                </div>
                                <div className="con_center">
                                    <div className="price"><span>支付金额：</span>￥{x.payAmount}</div>
                                    <div className="common"><span>下单时间：</span>{moment(x.orderTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                                    <div className="common"><span>商品名称：</span>{x.itemName}</div>
                                </div>
                                {x.status+''==='3'&&x.doComment?<a className="con_right"  href="javascript:;" onClick={() => {hashHistory.push('/comment?id='+x.id+'&shopId='+x.shopId+'&itemImage='+x.itemImage)}}>
                                    <span className="notes" >去评论</span>
                                    <span className="iconfont icon-xiangyoujiantou"></span>
                                </a>:''}
                                {x.status+''==='1'?<span className="btn">
                                    <Button type="primary" onClick={() => {this.cancelOrd(x.id)}} >取消</Button>
                                </span>:''}
                                {x.status+''==='2'?<span className="btn">
                                    <Button type="primary" onClick={() => {this.okOrd(x.id)}} >完成</Button>
                                </span>:''}
                            </Flex>
                        </div>)
                    })}</div>
                <TabBar selectedTab='orderTab' />
            </div>
        );
    }
}

module.exports = Test;
