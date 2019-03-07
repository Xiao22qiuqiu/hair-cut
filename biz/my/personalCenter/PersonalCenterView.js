import React, {PropTypes, Component} from 'react';
import {inject,observer} from 'mobx-react';
import { Flex, Toast, Carousel,Modal,ImagePicker,Button  } from 'antd-mobile';
import TabBar from '../../pubBiz/tabBar/tabBarView';
import './PersonalCenterLess.less';
import Config from 'config/Config';

/**
 * 视图层，功能逻辑，html代码将存放于此
 * ------------个人中心组件-------------
 */

@inject('personalCenter')
@observer
class PersonalCenterView extends Component {

    constructor(props, context) {
        super(props, context);
        this.stores = props.personalCenter;
        this.state={
            visible:false,//头像
        }
    }
    //进入页面调用方法
    componentDidMount() {
        this.stores.getMemberInfo();
    }
    changeHead = ()=> {
        this.setState({visible:true})
    }



    render() {
        let { info } = this.stores.state;
        {console.log('fff',info)}

        return (
            <div className="personal-center-page">
                <Flex className="user-info-wrap">
                    <img className="header-img" src={'data:image/png;base64,'+info.avatarUrl} onClick={()=>window.app.routerGoTo('my/changeHead?id='+1)}/>
                    <div className="account-info">
                        <div className="account" onClick={()=>window.app.routerGoTo('my/perMessage')}>{info.username}></div>
                    </div>
                </Flex>
                <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item" onClick={() => window.app.routerGoTo('orderList?status=2')}>
                        <img src="assets/images/my/baber.png" />
                        <span className="nav-text ellipsis">我的预约</span>
                    </div>
                </Flex>
                <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item" onClick={() => window.app.routerGoTo('orderList')}>
                        <img src="assets/images/my/wodedingdan.png" />
                        <span className="nav-text ellipsis">我的订单</span>
                    </div>
                </Flex>
               {/* <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item">
                        <img src="assets/images/my/wodeguanzhu.png" />
                        <span className="nav-text ellipsis">我的收藏</span>
                    </div>
                </Flex>*/}

                <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item" onClick={() => window.app.routerGoTo('my/editKey')}>
                        <img src="assets/images/my/password.png" />
                        <span className="nav-text ellipsis">更改密码</span>
                    </div>
                </Flex>
                <Flex className="nav-list" wrap="wrap">
                    <div className="nav-item" onClick={() => {window.app.routerGoTo('login');localStorage.setItem(Config.authName, '')}}>
                        <img src="assets/images/my/set.png" />
                        <span className="nav-text ellipsis">退出登录</span>
                    </div>
                </Flex>

                <TabBar selectedTab = 'myTab'/>
            </div>
        )
    }
}

module.exports = PersonalCenterView;