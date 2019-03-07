import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import { Toast } from 'antd-mobile';
import Serv from './addShopServ';
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
        sfiles: [],//店铺logo
        elementImgs:[],//店铺环境图片，
        areas:[],//省市区编码
        shopData: {
            moneyOff:'',//满减额
            coupon:'',//满减值
            discount:'',//折扣
            shopName:'',
            phone:'',
            address:'',//详细地址
            latitude:'',//经度
            longitude:'',//纬度
            introduction:'',//简介
            shopImage:'',//店铺logo
            environmentImageList:[],//店铺环境图片，
            tips:[],//优惠信息
            itemList:[{name:'',price:'',shopPrice:''}],
            shopBarberList:[{name:'',grade:'',times:'',appoitTips:'',workTime:''}],//美发师信息
        },
        cloneshopData:{
            shopName:'',
            phone:'',
            address:'',//详细地址
            lat:'',//经度
            lng:'',//纬度
            introduction:'',//简介
            shopImage:'',//店铺logo
            environmentImageList:[],//店铺环境图片，
            tips:[],//优惠信息
            itemList:[{name:'',price:'',shopPrice:''}],
            shopBarberList:[{name:'',grade:'',times:'',appoitTips:'',workTime:''}],//美发师信息
        },
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改


    @action
    getSpotFun(lat, lng){
        this.state.shopData.latitude=lat;
        this.state.shopData.longitude=lng;
    }
    //上传店铺logo照片
    @action
    onImg(files,item,index){
        let arr=[]
        console.log('files',files)
        this.state.sfiles=files
        arr = files[0].url.split(",");// 在每个逗号(,)处进行分解。
        this.state.shopData.shopImage=arr[1]

    }
    //上传环境照片
    @action
    onImg2(files,item,index){
        this.state.elementImgs=files
        this.state.shopData.environmentImageList=[];
        files&&files.map((x,i)=>{
            let arr=[],img=''
            arr = files[i].url.split(",");// 在每个逗号(,)处进行分解。
            img=arr[1]
            this.state.shopData.environmentImageList.push(img)

        })
        console.log('kkk',this.state.shopData.environmentImageList)
    }

    //更新值
    @action
    updateModel(value,name) {
        this.state.shopData[name]=value
    }
    //更新商品数据
    @action
    updateModel2(value,name,itemName,index) {
        this.state.shopData[name][index][itemName] = value
    }

    //添加商品或美发师数据
    @action
    addItemMod(name) {
        if(name=='itemList'){
            console.log(this.state.shopData.itemList)
            this.state.shopData[name].push(
                {name:'',shopPrice:'',price:'',shopfiles:[],}
            )
        }else{
            this.state.shopData[name].push(
                {name:'',grade:'',times:'',appoitTips:'',workTime:''}
            )
        }

    }
    //删除商品或美发师数据
    @action
    deleteFun(name,i) {
        this.state.shopData[name].splice(i,1)
    }

    //
    @action
    async addOk(name) {
        if(name=='add'){
            let param=this.state.shopData
            let {data, resultCode, resultMsg} = await Serv.addShop(JSON.stringify(param));
            //如果是异步，必须在runInAction
            if(resultCode==0){
                Toast.success('新增成功！', 1)
            }else {
                console.log('失败！',resultMsg)
                return false
            }
            //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
            autorun(() => {
            })
        }else{
            this.state.shopData=this.state.cloneshopData
            this.state.sfiles=[]
            this.state.elementImgs=[]
        }

    }
    //用action定义事件
    @action
        setPosition = (item) => {
            this.state.position = item;
            //this.getIndexData();  //刷新数据
        }
    //用action定义事件
    @action
        reset = () => {
            this.state.shopData=this.state.cloneshopData
            this.state.sfiles=[]
            this.state.elementImgs=[]
    }

    @action
    async add() {
        let param={
            username:this.state.username,
            mobile:this.state.mobile,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        };
        let {data, resultCode, resultMsg} = await Serv.testServ(JSON.stringify(param));
        //如果是异步，必须在runInAction
        if(resultCode==0){
            console.log('登录成功')
        }
        //监控数据变化的回调,读取什么参数，即代表将要监控什么数据
        autorun(() => {
        })
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;