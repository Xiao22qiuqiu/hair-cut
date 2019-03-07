import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { NavBar } from 'antd-mobile'
import Config from 'config/Config';
import Util from 'util';
import Style from './onShowLess.less';
import {browserHistory,hashHistory} from 'react-router'
import TabBar from '../pubBiz/tabBar/tabBarView'
/**
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("onShow")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.onShow;
    }

    componentDidMount() {
        this.stores.getshop();
    }

    render() {
        let {list}=this.stores.state
        return (
            <div className="onShow">
                <NavBar
                    mode="light"
                    >时尚资讯
                </NavBar>
                <div className="shopsList">
                    <ul key='list'>
                        {
                            list && list.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <div className='users clearfix'>
                                            <div className="userImg" onClick={()=>{hashHistory.push('/shops?id='+item.id)}}><img src={'data:image/png;base64,'+item.shopImage} /></div>
                                            <div className="userName">{item.shopName}</div>
                                        </div>
                                        <div className='remark'>
                                            <span>{item.introduction}</span>
                                        </div>
                                        <div>
                                            {item.environmentImageList.map((x,i)=>{
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
                <TabBar selectedTab='showsTab' />
            </div>
        );
    }
}

module.exports = Test;
