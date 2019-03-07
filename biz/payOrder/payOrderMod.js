import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './payOrderServ';
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
        logo:'',
        list:{},

    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件

    @action
    async perSubmit(params){
        /*let {data, resultCode, resultMsg} = await Serv.priceSubmit(params) ;
        runInAction(() => {
            this.state.priceSubmit = data.resultCode;
        })
        console.log("1111",this.state.priceSubmit)*/
    }
    @action
    async getOrder(params){
        let {data, resultCode, resultMsg} = await Serv.getOrderServ(params) ;
         runInAction(() => {
         this.state.list = data;
         })
    }

}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;