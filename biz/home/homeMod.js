import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './homeServ';
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
        position: { label: '广州市', postCode: '510001' },
        areaList:[],//省市区
        shopName:'',
        adList:[{imgUrl:'assets/images/home/carousel/3.jpg'},
            {imgUrl:'assets/images/home/carousel/timg (1).jpg'},
            {imgUrl:'assets/images/home/carousel/timg.jpg'},
            {imgUrl:'assets/images/home/carousel/timg（2）.jpg'}
        ],   //轮播图
        shopsList:[],
        visible:false,
        latAndLon:[116.397921, 39.900164] ,    //经纬度
        locations: [],//定位点
        addressName:'' ,    //地图定位点名称

    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改

    //用action定义事件
    @action
        setPosition = (item,areaList) => {
            this.state.position = item;
            this.state.areaList =areaList

            //this.getIndexData();  //刷新数据
        }
    //更新数据
    @action
        updateModel = (value,name) => {
            this.state[name] = value;
        }

    @action
    async mockText() {
        let {data,resultCode,resultMsg} = await Serv.dataServ();
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.shopsList = data;
            this.state.adList=[]
            data&&data.map((x,i)=>{
                if(i<4){
                    this.state.adList.push(x)
                }

            })
        })
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
            console.log("chen qiuming: ", this.state.shopsList)
        })
    }

    //搜索
    @action
    async searchModel () {
        if(this.state.areaList.length<3){
            this.state.areaList=[]
        }
        let params={
            shopName:this.state.shopName,
            areaName:this.state.areaList[2]||'',
            address:'',
            provinceName:this.state.areaList[0]||'',
            cityName:this.state.areaList[1]||'',
        }
        let {data,resultCode,resultMsg} = await Serv.dataServ(params);
        //如果是异步，必须在runInAction
        runInAction(()=> {
            this.state.shopsList = data;
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;