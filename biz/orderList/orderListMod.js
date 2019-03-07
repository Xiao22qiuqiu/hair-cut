import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import {Toast} from 'antd-mobile';
import Serv from './orderListServ';
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
        list: [],
        orderList:[],
        index:'' //tabs的下标
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件

    @action
    async getOrder(status) {
        /*if(status){
            console.log('hhhh',status)
            this.state.index=status
        }*/
        let param={
            status:this.state.index
        };
        let {data, resultCode, resultMsg} = await Serv.orderLists(param);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.orderList = data;
        })
    }
    //存tabs的下标
    @action
    getTabsIndex(index) {
        this.state.index=index
        this.getOrder();
    }

    //取消订单
    @action
    async cancelMod(id) {
        let param={
            orderId:id
        };
        let {data, resultCode, resultMsg} = await Serv.cancelOrderServ(JSON.stringify(param));
        if(resultCode==0){
            Toast.success('取消成功！', 1)
        }else{
            Toast.success('取消失败！', 1)
            return false
        }
        this.state.index=''
        this.getOrder();
        console.log("chen", data)
    }

    //取消订单
    @action
    async okMod(id) {
        let param={
            orderId:id
        };
        let {data, resultCode, resultMsg} = await Serv.okOrderServ(JSON.stringify(param));
        if(resultCode==0){
            Toast.success('后台操作订单！', 1)
        }else{
            Toast.success('后台操作失败！', 1)
            return false
        }
        this.state.index=''
        this.getOrder();
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;