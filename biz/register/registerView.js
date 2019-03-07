import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

import Config from 'config/Config';
import Util from 'util';
import Style from './registerLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 * ------------注册组件-------------
 */
//inject从props中获取相应的数据
@inject("register")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.register;
    }
    //改变数据
    updateMod=(value,name)=>{
        this.stores.updateModel(value,name);
    }
    //登录
    onOk(){
        this.stores.regist();
    }

    render() {
        let {username,realName,mobile,password,confirmPassword}=this.stores.state;
        return (
            <div className="loginBox">
                <div className="registerbox">
                    <div className="logo">
                        <img className="Img" src="assets/images/register/registerlogo2.png" alt=""/>
                    </div>
                    <div className="textbox">
                        <div className="account">
                            <span><img src="assets/images/register/user.png" alt=""/></span>
                            <input type="text" value={username} placeholder="请输入账号" onChange={e=>this.updateMod(e.target.value,'username')}/>
                        </div>
                        <div className="account">
                            <span><img src="assets/images/register/user.png" alt=""/></span>
                            <input type="text" value={realName} placeholder="请输入真实姓名" onChange={e=>this.updateMod(e.target.value,'realName')}/>
                        </div>
                        <div className="account">
                            <span><img src="assets/images/register/phone.png" alt=""/></span>
                            <input type="text" value={mobile}  placeholder="请输入手机号" onChange={e=>this.updateMod(e.target.value,'mobile')}/>
                        </div>
                        <div className="password">
                            <span><img src="assets/images/register/password.png" alt=""/></span>
                            <input type="password" value={password}  placeholder="请输入密码" onChange={e=>this.updateMod(e.target.value,'password')}/>
                        </div>
                        <div className="password">
                            <span><img src="assets/images/register/password.png" alt=""/></span>
                            <input type="password" value={confirmPassword}  placeholder="请输入确认密码" onChange={e=>this.updateMod(e.target.value,'confirmPassword')}/>
                        </div>
                    </div>
                    <Button className="loginbottom" onClick={()=>this.onOk()}>注册</Button>
                    <div className="register">已有账号？<Link to='/login'>立即登录</Link></div>
                </div>
            </div>
        );
    }
}

module.exports = Test;
