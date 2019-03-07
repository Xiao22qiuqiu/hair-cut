import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import {browserHistory,hashHistory} from 'react-router'
import {Toast} from 'antd-mobile';
import Serv from './commentServ';
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
        commentList:{},
        introduction:'',
        shopImg:'',
        imgList:[],//图片列表
        score:'5',
        commentImage:[],//图片
    };
    //如果设定了useStrict严格模式，那么所有observable的值的修改必须在action定义的方法内，否则可以直接修改
    //更新值
    @action
    updateModel(value,name) {
        this.state[name]=value
    }
    //上传照片
    @action
    onImg(files,item,index){
        this.state.imgList=files
        console.log('files',files)
        this.state.commentImage=[];
        files&&files.map((x,i)=>{
            let arr=[],img=''
            arr = files[i].url.split(",");// 在每个逗号(,)处进行分解。
            img=arr[1]
            this.state.commentImage.push(img)
        })
    }
    //评分
    @action
    submitScore(score){
        this.state.score=score
        console.log('scroe',score)
    }
    //提交
    @action
    async submit(){
        let param={
            orderId:this.state.commentList.orderId,
            shopId:this.state.commentList.shopId,
            score:this.state.score,
            remark:this.state.introduction,
            commentImage:this.state.commentImage,

        };
        let {data, resultCode, resultMsg} = await Serv.submitServ(JSON.stringify(param));

        if(resultCode==0){
            Toast.success('评论成功！', 1)
        }else{
            Toast.success('评论失败！', 1)
            return false
        }
        hashHistory.push('/shops?id='+this.state.commentList.shopId)
        this.cancelData();
    }
    //
    @action
    getData(params){
        this.state.commentList=params
        console.log('params',params)
    }
    //
    @action
    cancelData(){
        this.state = {
            commentList:{},
            introduction:'',
            shopImg:'',
            imgList:[],//图片列表
            score:'5',
            commentImage:[],//图片
        }
    }
}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;