import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import Style from './TestLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("test3")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.test3;
    }

    data(){
        this.stores.text();
    }

    data2(){
        this.stores.mockText();
    }

    render() {
        return (
            <div className="row">
                <img src="../assets/images/order_pro.png"/>
                {
                    this.stores.state.list.map((item)=>{
                        return <li key={Math.random()}>{item.name}</li>
                    })
                }
                <a onClick={this.data.bind(this)}>点击获取异步数据</a><br/>
                <a onClick={this.data2.bind(this)}>点击获取本地mock数据</a>
            </div>
        );
    }
}

module.exports = Test;
