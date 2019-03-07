import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './onShowServ';
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
        list: []
    };
    @action
    async getshop(id) {
        let {data, resultCode, resultMsg} = await Serv.dataServ();
        runInAction(()=> {
            this.state.list = data;
            console.log(data)
        })

    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;