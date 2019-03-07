import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("test")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.test;
    }

    render() {
        return (
            <div className="row">
                {this.stores.state.a.aa}<br/>
                <a onClick={e=>{
                    this.stores.routesGo(11112,function(){window.app.routerGoTo("/test2")});
                }}>跳转到下一个页面</a>
            </div>
        );
    }
}

module.exports = Test;
