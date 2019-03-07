import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './resetKeyServ';
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
        userList: {
            url:'assets/images/shops/shop4.png',
            name:'qq111111',
            id:'1',
            score:4,
            address:'广州时尚天河bbb层'
        },
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    @action
    userDelFun(item,index){
        console.log('重置的内容',item,index)
        this.state.userList[index].password='00000000'
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;