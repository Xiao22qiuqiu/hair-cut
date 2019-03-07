import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import {Link, IndexLink,browserHistory,hashHistory} from 'react-router'
import Serv from './loginServ';
import { Toast } from 'antd-mobile';
import Util from 'util';
import Config from 'config/Config';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class Test {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        visible:false,  //弹窗状态
        list: [],
        username:'',
        password:'',
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件

    //进入页面执行
    @action
    getIndexData() {
        console.log('进入页面执行')
    }
    //打开联系管理员弹窗
    @action
    toModalFun(value,name) {
        this.state.visible = value;
    }
    //更新值
    @action
    async updateModel(value,name) {
        this.state[name]=value
    }
    //用action定义事件
    @action
    async onLogin(manage) {
        let param={
            username:this.state.username,
            password:this.state.password,
        };
        let {data, resultCode, resultMsg} = await Serv.onLoginFun(JSON.stringify(param));
        //如果是异步，必须在runInAction
        if(resultCode==0){
            Toast.success('登录成功！', 1)
            localStorage.setItem(Config.authName, data)
        }else {
            Toast.fail(resultMsg, 1)
            return false
        }
        if(manage&&this.state.username=='admin'&&this.state.password=='admin'){
            hashHistory.push('/userlist')
        }
        else{
            hashHistory.push('/home')
        }
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;