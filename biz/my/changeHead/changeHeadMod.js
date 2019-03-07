import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import {browserHistory,hashHistory} from 'react-router'
import {Toast} from 'antd-mobile';
import Serv from './changeHeadServ';
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
        files:[],
        avatarUrl:''
    };

    @action
    onImg(files,item,index){
        this.state.files=files
        let arr = files[0].url.split(",");// 在每个逗号(,)处进行分解。
        this.state.avatarUrl=arr[1]
    }

    @action
    async onSubmit() {
        let {data, resultCode, resultMsg} = await Serv.orderLists(JSON.stringify({avatarUrl:this.state.avatarUrl}));
        if(resultCode==0){
            Toast.success('头像更换成功！', 1)
        }else{
            Toast.success('头像更换失败！', 1)
            return false
        }
        hashHistory.push('/my/personalCenter')

    }

}

//将组件实例化，这意味着组件将不能从别处实例化
const test = new Test();

export default test;