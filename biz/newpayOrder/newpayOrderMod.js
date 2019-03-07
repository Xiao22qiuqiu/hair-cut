import React, { PropTypes, Component } from 'react';
import {browserHistory,hashHistory} from 'react-router'
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import { Toast } from 'antd-mobile';
import Serv from './newpayOrderServ';
import Config from 'config/Config';
import Verify from 'util/Verify';
/**
 * mod层
 * 业务逻辑，数据逻辑应该存储于此
 */
//定义为严格模式
useStrict(true)
class Test {
    //将数据设为被观察者，这意味着数据将成为公共数据
    @observable state = {
        show:false,//username
        showGoods:false,//youhui
        value:'2',//youhui
        logo:'',
        dataList:{},
        userMess:{
            name:'',
            tel:'',
        },
        selectValue:'0',//选择优惠值：0：无，1：满减，2：打折
        couponAmount:0,//优惠值
        total:0,

    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //用action定义事件
    //下单
    @action
    async perSubmit(message){
        let {dataList,couponAmount}=this.state
        let params={
            name:message.name,
            phone:message.tel,
            couponAmount:couponAmount,
            itemAmount:Number(dataList.shopPrice),
            remark:message.remark,
            shopId:dataList.shopId,
            itemId:dataList.id,
            payAmount:Number(dataList.shopPrice)-couponAmount
        }
        let {data, resultCode, resultMsg} = await Serv.getOrderServ(JSON.stringify(params)) ;
        if(resultCode==0){
            Toast.success('下单成功！', 1)
        }else{
            Toast.fail(resultMsg, 1)
            return false
        }
        hashHistory.push('/onPay?id='+data.orderId+'&payAmount='+data.payAmount)
    }
    //url参数
    @action
    getOrder(params){
        this.state.dataList=params
        this.state.total=params.shopPrice
    }
    //选择优惠
    @action
    setGoods(value){
        this.state.selectValue=value
        this.setTotal();
    }
    //优惠值
    setTotal=()=>{
        let {dataList,selectValue,couponAmount,total}=this.state
        console.log('dataList,selectValue,couponAmount',dataList,selectValue,couponAmount)
        if(selectValue=='0'){
            couponAmount=0
        }
        if(selectValue=='1'){
           couponAmount=Number(dataList.coupon)
        }
        if(selectValue=='2'){
            couponAmount=Number(dataList.shopPrice)*(1-dataList.discount/10)
        }
        this.state.total=(Number(total)-couponAmount).toFixed(2)
        this.state.couponAmount = couponAmount.toFixed(2)
    }
    //
    @action
    async onSubmit(value){
        this.state.value=value

    }
    //更新用户信息
    @action
    updateMod(name,values){
        this.state[name]=values
    }

    //
    @action
    async getUser(){
        let {data, resultCode, resultMsg} = await Serv.getUserServ(JSON.stringify()) ;
        runInAction(()=> {
            this.state.userMess.name=data.realName
            this.state.userMess.tel=data.mobile
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;