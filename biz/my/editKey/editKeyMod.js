import React, { PropTypes, Component } from 'react';
import {browserHistory,hashHistory} from 'react-router'
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './editKeyServ';
import { Toast } from 'antd-mobile';
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
        user:{
            oldPassword:'',
            password:'',
            confirmPwd:'',
        }
    };

    //更新值
    @action
    updatePswMod(name,value) {
        this.state.user[name]=value
    }
    @action
    async subMit() {
        let {user}=this.state
        if(user.confirmPwd!==user.password){
            Toast.fail('两次密码不一致！', 1)
            return false
        }
        let {data, resultCode, resultMsg} = await Serv.editKeyServ(JSON.stringify(user));
        //如果是异步，必须在runInAction
        if(resultCode == 0){
            Toast.success('修改密码成功！', 1)
        }else {
            Toast.fail('旧密码输入错误', 1)
            return false
        }
        // setTimeout(hashHistory.push('/login'), 3000 )
        hashHistory.push('/my/personalCenter')
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;