import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './userListServ';
import {browserHistory,hashHistory} from 'react-router'
import {Toast} from 'antd-mobile';
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
        userList: []
    };
    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    @action
    async getUsers() {
        let {data, resultCode, resultMsg} = await Serv.userListServ();
        runInAction(()=> {
            this.state.userList = data.list;
        })
        console.log('dd',data)
    }
    @action
    async resetKeyMod(id){
        let {data, resultCode, resultMsg} = await Serv.resetKeyServ(JSON.stringify({accountId:id}));
        if(resultCode==0){
            Toast.success('已重置！', 1)
        }else{
            Toast.success('重置失败！', 1)
            return false
        }
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;