import React, {PropTypes, Component} from 'react'
import {Link, IndexLink,browserHistory, hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import Style from './loginLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
/**
 * 视图层，功能逻辑，html代码将存放于此
 * ------------登录组件-------------
 */
//inject从props中获取相应的数据
@inject("login")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.login;
    }
    //进入页面执行
    componentDidMount() {
        this.getData();
    }

    //获取数据
    getData = () => {
        this.stores.getIndexData();
    }

    toModal(val,name){
        this.stores.toModalFun(val,name);
    }
    //改变数据
    updateMod=(value,name)=>{
        this.stores.updateModel(value,name);
    }
    //登录
    onOk(isManage){
        this.stores.onLogin(isManage);
    }


    render() {
        let {username,password}=this.stores.state;
        return (
            <div className="loginBox">
                <div className="login">
                    <div className="logo">
                        <img className="Img" src="assets/images/login/loginlogo.png" alt=""/>
                    </div>
                    <div className="textbox">
                        <div className="account">
                            <span><img src="assets/images/login/user.png" alt=""/></span>
                            <input type="text" placeholder="请输入账号" value={username} onChange={e=>this.updateMod(e.target.value,'username')}/>
                        </div>
                        <div className="password">
                            <span><img src="assets/images/login/password.png" alt=""/></span>
                            <input value={password} type="password" placeholder="请输入密码" onChange={e=>this.updateMod(e.target.value,'password')}/>
                        </div>
                    </div>
                    <Button className="loginbottom" onClick={()=>this.onOk(this.props.location.query.id)}>登录</Button>
                    {this.props.location.query.id? <div className="register">以管理员身份（admin/admin）</div>:
                        <div className="register">还没账号？<Link to='/register' style={{color:'#E51C23'}}>立即注册</Link></div>

                    }

                </div>
                {
                    this.props.location.query.id?'':
                        <WingBlank>
                            <div className="forget" ><a href="javascript:;" onClick={()=>this.toModal(true,'open')}>忘记密码?</a></div>
                            <WhiteSpace />
                            <Modal
                                visible={this.stores.state.visible}
                                transparent
                                maskClosable={false}
                                onClose={()=>this.toModal(false,'close')}
                                title="忘记密码？？？"
                                footer={[{ text: 'Ok', onPress: () => {this.toModal(false);hashHistory.push('/login?id='+1)} }]}
                                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                >
                                <div>
                                    <p>请联系管理员！</p>
                                    <p>联系方式：110110110</p>
                                </div>
                            </Modal>
                        </WingBlank>
                }

            </div>
        );
    }
}

module.exports = Test;
