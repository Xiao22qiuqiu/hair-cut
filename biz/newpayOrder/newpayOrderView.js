import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {TextareaItem,Modal,Flex, Tabs, Toast, NavBar, Icon,Range,Button,InputItem,List} from 'antd-mobile';
import { createForm } from 'rc-form'; //form表控件
import { tabs } from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './newpayOrderLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
import Verify from 'util/Verify';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("newpayOrder")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.newpayOrder;
    }
    state={
        show:false,
        showGoods:false,
        inputIndex:0,
        message:'',
        //商家优惠信息
        youList:[
            {key:'0',name:'无',value:'0'},
            {key:'1',name:'满减',value:'1'},
            {key:'2',name:'折扣',value:'2'}
        ],
        name:'',
        tel:'',
    }

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        let params={
            id:this.props.location.query.id,
            name:this.props.location.query.name,
            shopPrice:this.props.location.query.shopPrice,
            shopId:this.props.location.query.shopId,
            shopName:this.props.location.query.shopName,
            discount:this.props.location.query.discount,
            coupon:this.props.location.query.coupon,
            moneyOff:this.props.location.query.moneyOff
        }
        this.stores.getOrder(params);
        console.log(this.props.location.query.discount == 'null')
        if(this.props.location.query.discount == 'null' ){
            if(this.props.location.query.moneyOff == 'null'||this.props.location.query.shopPrice<this.props.location.query.moneyOff){
                this.setState(
                    {youList:[
                        {key:'3',name:'无',value:'0'},
                    ],}
                )
            } else if(this.props.location.query.discount == 'null' && this.props.location.query.moneyOff != 'null'){
                this.setState(
                    {youList:[
                        {key:'1',name:'满减',value:'1'},
                        {key:'3',name:'无',value:'0'},
                    ],}
                )
            }
        }else {
            if (this.props.location.query.moneyOff != 'null') {
                this.setState(
                    {
                        youList: [
                            {key: '1', name: '满减', value: '1'},
                            {key: '2', name: '折扣', value: '2'},
                            {key:'3',name:'无',value:'0'},
                        ],
                    }
                )
            } else {
                this.setState(
                    {
                        youList: [
                            {key: '2', name: '折扣', value: '2'},
                            {key:'3',name:'无',value:'0'}
                        ],
                    }
                )
            }
        }

        if(this.props.location.query.discount == 'null' && this.props.location.query.moneyOff != 'null'){
            this.setState(
                {youList:[
                    {key:'3',name:'无',value:'0'},
                    {key:'1',name:'满减',value:'1'},
                ],}
            )
        }
        this.stores.getUser()
        this.setState({name:this.stores.state.userMess.name})
        this.setState({tel:this.stores.state.userMess.tel})
    }

    //弹窗状态值改变
    updateModal = (value,name) =>{
        if(name=='show'){
            this.setState({show:value})
        }
        if(name=='showGoods'){
            this.setState({showGoods:value})
        }
    }
    //
    onFocus(value){
        this.setState({inputIndex:value});
    }
    //选择优惠
    onGoods(value){
        this.stores.setGoods(value);
        //this.setState({selectValue:value})
        //console.log('selectValue',this.state.selectValue)
        //this.setTotal();
    }

    //信息提交
    submitAskPrice = (name) => {
        let values={
            name:this.state.name,
            tel:this.state.tel,
        }
        this.setState({show:false})
        this.stores.updateMod(name,values)
    }
    //提交信息
    onSubmit = () => {
        let message={
            name:this.state.name,
            tel:this.state.tel,
        }
        this.stores.perSubmit(message)
    }


    render() {
        let {dataList,userMess,selectValue,couponAmount,total}=this.stores.state;
        let {inputIndex,message,youList}=this.state

        return (
            <div className="payOrder">
                <Modal
                    popup
                    visible={this.state.show}
                    animationType="slide-up"
                    onClose={e=>this.updateModal(false,'show')}
                    >
                    <div className="fill-info">
                        <p className="fill-title">填写个人信息</p>
                        <div className="fill-form">
                            <InputItem
                                placeholder="请输入姓名"
                                ref={el => this.labelFocusInst = el}
                                onClick={()=>this.onFocus(0)}
                                className={inputIndex == 0 ? 'selected' : ''}
                                dataList-index="0"
                                value={this.state.name}
                                onChange={(value) => {this.setState({name: value})}}
                                ><div className="required" onClick={() => this.labelFocusInst.focus()}>姓名</div></InputItem>
                            <InputItem
                                placeholder="请输入手机号码"
                                ref={el => this.labelFocusInst = el}
                                dataList-index="1"
                                onClick={()=>this.onFocus(1)}
                                className={inputIndex == 1 ? 'selected' : ''}
                                value={this.state.tel}
                                onChange={(value) => {this.setState({tel: value})}}
                                ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }>手机号码</div></InputItem>
                            <p className="fill-tips fz_24">*位置不能为空</p>
                        </div>
                        <div className="submit-btn">
                            <Button type="primary" onClick={()=>this.submitAskPrice('userMess') }>确 定</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    popup
                    visible={this.state.showGoods}
                    animationType="slide-up"
                    onClose={e=>this.updateModal(false,'showGoods')}
                    >
                    <div className="fill-goods">
                        <p className="fill-title">商家优惠</p>
                        {youList.map((x,i)=>{
                            return (<div key={x.key} className="goods" onClick={() => this.onGoods(x.value)}>
                                {x.name}
                            </div>)
                        })}
                    </div>
                </Modal>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >下单
                </NavBar>
                <List className="my-name">
                    <Item arrow="horizontal" multipleLine onClick={() => this.updateModal(true,'show')}>
                        {userMess.name} <Brief><span className="Icon iconfont icon-dianhua"></span>{userMess.tel}</Brief>
                    </Item>
                </List>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {hashHistory.push('/shops?id='+dataList.shopId)}}
                        >
                        <span>{dataList.shopName}</span>
                    </Item>
                </List>
                <List renderHeader={() => '订单信息'} className="my-list">
                    <Item>
                        {dataList.name}
                    </Item>
                </List>
                <List renderHeader={() => '留言信息'} className="my-list">
                    <Brief>
                        <TextareaItem
                            title="给商家留言："
                            rows={4}
                            dataList-index="3"
                            onClick={()=>this.onFocus(3)}
                            className={inputIndex == 3 ? 'selected' : ''}
                            value={message}
                            onChange={(value) => {this.setState({message: value})}}
                            />
                    </Brief>

                </List>

                <List renderHeader={() => '发票类型'} className="my-list">
                    <Item extra="个人纸质发票" arrow="empty" className="spe" wrap>
                        发票类型
                    </Item>
                </List>
                <List renderHeader={() => '商家优惠'} className="my-list">
                    <Item extra={selectValue=='0'?'无':selectValue=='1'?'满'+dataList.moneyOff+'减'+dataList.coupon:'打'+dataList.discount+'折'} arrow="horizontal" onClick={() => {this.updateModal(true,'showGoods')}}>优惠</Item>
                </List>
                <List renderHeader={() => '商品金额'} className="my-price">
                    <Item extra={total} arrow="empty" className="spe" wrap>
                        合计：
                    </Item>
                </List>
                <List className="my-btn">
                    <Item>
                        <Button type="primary" size="large" inline onClick={()=>this.onSubmit()}>提交订单</Button>
                    </Item>
                </List>
            </div>
        );
    }
}
module.exports = Test;
