import React, { PropTypes, Component } from 'react';
import { Toast } from 'antd-mobile';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import {Link, IndexLink,browserHistory,hashHistory} from 'react-router'
import Serv from './registerServ';
import Verify from 'util/Verify';
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
        username:'',//用户姓名
        realName:'',//真实姓名
        mobile:'',
        password:'',
        confirmPassword:''
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件
    @action
    async regist() {
        let param={
            username:this.state.username,
            mobile:this.state.mobile,
            password:this.state.password,
            realName:this.state.realName,
            confirmPassword:this.state.confirmPassword
        };
        if(!Verify.isPhoneNum(this.state.mobile)){
            Toast.fail('手机格式不正确！', 1)
            return false
        }
        if(this.state.confirmPassword!==this.state.password){
            Toast.fail('两次密码不一致！', 1)
            return false
        }
        let {data, resultCode, resultMsg} = await Serv.testServ(JSON.stringify(param));
        //如果是异步，必须在runInAction
        if(resultCode==0){
            Toast.success('注册成功！', 1)
        }else{
            Toast.fail(resultMsg, 1)
            return false
        }
        hashHistory.push('/login')
        // setTimeout(, 5000 )
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
        })
    }
    //更新值
    @action
    async updateModel(value,name) {
        /*if(name=='mobile'){
            if(Verify.isPhoneNum(value)){
                this.state[name]=value
            }else {
                Toast.fail('手机格式不正确！', 1)
                return false
            }
        }else{*/
            this.state[name]=value
        // }
    }

}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;