import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { List } from 'antd-mobile';
import MamaTabBar from '../pubBiz/mamaTabBar/mamaTabBarView'
const Item = List.Item;
const Brief = Item.Brief;

import Config from 'config/Config';
import Util from 'util';
import Style from './resetKeyLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("resetKey")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.resetKey;
    }

    userDel(x,i){
        this.stores.userDelFun(x,i);
    }


    render() {
        let {userList}=this.stores.state;
        return (
            <div className="userList">
                <List renderHeader={() => '用户列表'} className="my-list" >
                    {
                        userList && userList.map( (x,i) => {
                            return (<Item extra="重置密码" key={'user'+i} onClick={e => this.userDel(x,i)}>{x.user}</Item>)
                        })
                    }
                </List>
                <MamaTabBar selectedTab='orderTab' />
            </div>
        );
    }
}

module.exports = Test;
