import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {Flex, NavBar, Icon,List} from 'antd-mobile';
import { tabs , StarRange} from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './perMessageLess.less';
import moment from 'moment';

const Item = List.Item;
const Brief = Item.Brief;

/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("perMessage")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.perMessage;
    }
    extra=<span className="list-Img">
        <img src="assets/images/home/carousel/3.jpg" alt=""/>
    </span>

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
        this.getData();
    }
    //获取数据
    getData = () => {
        this.stores.getOrder();
    }

    render() {
        let {orderList}=this.stores.state;
        return (
            <div className="perMessage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >个人信息
                </NavBar>

                <List renderHeader={() => ''} className="my-list">
                    <Item extra={<span className="list-Img"><img src={'data:image/png;base64,'+orderList.avatarUrl} alt=""/></span>} arrow="empty" className="spe" wrap>
                        头像
                    </Item>
                    <Item extra={orderList.username} arrow="empty" className="spe" wrap>
                        用户名
                    </Item>
                    <Item extra={orderList.realName} arrow="empty" className="spe" wrap>
                        姓名
                    </Item>
                    <Item extra={orderList.mobile} arrow="empty" className="spe" wrap>
                        用户手机号
                    </Item>
                </List>
                <List renderHeader={() => ''} className="my-time">
                    <Item extra={moment(orderList.createTime).format("YYYY-MM-DD HH:mm:ss")} arrow="empty" className="spe" wrap>
                        注册时间
                    </Item>
                </List>
            </div>
        );
    }
}

module.exports = Test;
