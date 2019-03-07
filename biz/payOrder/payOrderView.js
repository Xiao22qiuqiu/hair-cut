import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {TextareaItem,Modal,Flex, Tabs, WhiteSpace, NavBar, Icon,Range,Button,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form'; //form表控件
import { tabs } from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './payOrderLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("payOrder")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.payOrder;
    }
    state={
        inputIndex:0,
        message:'',
        //商家优惠信息
        youList:[
            {key:'3',name:'无',value:'0'},
            {key:'1',name:'满减',value:'1'},
            {key:'2',name:'9.9折',value:'2'}
        ],

    }

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        //获取数据
        this.stores.getOrder({orderId:this.props.location.query.id});
    }

    //弹窗状态值改变
    updateModal = (value,name) =>{
        this.stores.updateMod(value,name)
    }

    onFocus(value){
        this.setState({inputIndex:value});
    }
    //表单提交
    submitAskPrice = () => {
        this.stores.perSubmit({
            name:'car',
            tel:'0001',
            note:'car',
        })
    }


    render() {
        let {list}=this.stores.state;
        let {inputIndex,message,youList}=this.state
        {console.log(this.props)}

        return (
            <div className="payOrder">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >订单详情
                </NavBar>
                <List renderHeader={() => '用户信息'} className="my-name">
                    <Item>
                        <Brief>用户名称：</Brief>
                        <Brief>用户电话：</Brief>
                    </Item>
                </List>
                <List renderHeader={() => '订单信息'} className="my-list">
                    <Item>
                        <Brief>商品名称：</Brief>
                        <Brief>订单编号：</Brief>
                        <Brief>下单日期：</Brief>

                    </Item>
                </List>
                <List renderHeader={() => '店铺信息'} className="my-list">
                    <Item extra={list.shopName} arrow="horizontal" onClick={() => {this.updateModal(true,'showGoods')}}>
                        店铺名称
                    </Item>
                </List>
                <List renderHeader={() => '留言信息'} className="my-list">
                    <Item>
                        <Brief>留言：</Brief>
                    </Item>
                </List>

                <List renderHeader={() => '发票类型'} className="my-list">
                    <Item extra="纸质发票个人" arrow="empty" className="spe" wrap>
                        发票类型
                    </Item>
                </List>
                <List renderHeader={() => '商品金额'} className="my-price">
                    <Item extra='￥50.00' arrow="empty" className="spe" wrap>
                        支付金额：
                    </Item>
                </List>
            </div>
        );
    }
}
module.exports = Test;
