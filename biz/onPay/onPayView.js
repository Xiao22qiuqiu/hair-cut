import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {List, Tabs, WhiteSpace, NavBar, Icon,Button} from 'antd-mobile';
import { tabs , StarRange} from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './onPayLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'

const Item = List.Item;
const Brief = Item.Brief;
/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("onPay")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.onPay;

    }

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        let params={
            orderId:this.props.location.query.id,
            payAmount:this.props.location.query.payAmount
        }
        this.stores.getOrder(params);
    }

    //取消订单
    onSubmit=()=>{
        console.log('iiii',this.stores.state.orderId)
        this.stores.onSubmitFun();
    }


    render() {
        let {payAmount}=this.stores.state;
        return (
            <div className="pay">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >支付
                </NavBar>
                <div>
                </div>
                <List className="my-list">
                    <Item>
                        支付金额：{payAmount}
                    </Item>
                </List>
                <div className="my-btn">
                    <Button type="primary" size="large" inline onClick={()=>this.onSubmit()}>支付</Button>
                </div>
            </div>
        );
    }
}

module.exports = Test;
