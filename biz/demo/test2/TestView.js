import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import { inject ,observer} from 'mobx-react';


@inject("test")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class TestIndex extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.test;
    }

    render() {
        return (
            <div className="row">
                {this.stores.state.a.aa}
                <p><a onClick={e=>{
                    this.stores.routesGo("test3",window.app.routerGoTo("/test3"))
                }}>跳转测试异步请求页面</a></p>
            </div>
        );
    }
}

module.exports = TestIndex;
