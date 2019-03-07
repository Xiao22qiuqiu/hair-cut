import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { List, Radio, Flex, Modal,ImagePicker, WingBlank, SegmentedControl ,Button,TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import MamaTabBar from '../pubBiz/mamaTabBar/mamaTabBarView'
//引入地图
import QQMap from '../pubBiz/qqMap/qqMap.js'

import Config from 'config/Config';
import Util from 'util';
import Style from './addShopLess.less';
const RadioItem = Radio.RadioItem;

/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("addShop")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.addShop;
        this.state={
            visible:false,//qqMap
            radioData:[
                { value: 0, label: '满减'},
                { value: 1, label: '折扣'},
            ]
        }
    }

    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
    }
    onChange = (files, type, index) => {
        this.stores.onImg(files, type, index)
    }
    onChange2 = (files, type, index) => {
        this.stores.onImg2(files, type, index)
    }

    //改变数据
    updateMod=(value,name)=>{
        this.stores.updateModel(value,name);
    }
    updateMod2=(value,name,itemName,index)=>{
        this.stores.updateModel2(value,name,itemName,index);
    }
    //添加商品
    addItem=(name)=>{
        this.stores.addItemMod(name);
    }
    //选择地址
    selectAddr = () => {
        this.setState({visible:true})
    }
    //选择地址
    onClose = () => {
        this.setState({visible:false})
    }
    //保存
    okBtn=(name)=>{
        this.stores.addOk(name);
    }
    //删除商品
    deleteBtn=(name,index)=>{
        this.stores.deleteFun(name,index);
    }
    getSpot = (lat, lng) =>{
        this.stores.getSpotFun(lat, lng);
    }


    render() {
        let {shopData,sfiles,elementImgs,value}=this.stores.state;
        return (
            <div className="addShop">
                <Modal
                    popup
                    visible={this.state.visible}
                    onClose={()=>this.onClose()}
                    animationType="slide-up"
                    >
                    <QQMap style={{ width: '100%', height: 600 }} center={{ lat: 23.103526473149973, lng: 113.43549817800522 }} getSpot={this.getSpot} />
                    <Button type="primary" onClick={()=>this.onClose()}>确定</Button>
                </Modal>
                <div className="shops-common shops">
                    <h2>店铺信息</h2>
                    <div className="bg">
                        <label>店铺名称:</label>
                        <input type="text" value={shopData.shopName} placeholder="请输入店铺名称" onChange={e=>this.updateMod(e.target.value,'shopName')}/>
                    </div>

                    <div className="bg">
                        <label>预约电话:</label>
                        <input type="text" value={shopData.phone} placeholder="请输入预约电话" onChange={e=>this.updateMod(e.target.value,'phone')}/>
                    </div>
                    <div className="bg">
                        <label>优惠:</label>
                            <span style={{marginLeft:'53px'}}  className="discount" >
                                <span>1、满 <input value={shopData.moneyOff} onChange={e=>this.updateMod(e.target.value,'moneyOff')} className="textWidth" placeholder="满减值" type="text"/> 减
                                    <input value={shopData.coupon} onChange={e=>this.updateMod(e.target.value,'coupon')} className="textWidth" type="text"/></span>
                            </span>
                            <div style={{marginLeft:'153px'}} className="discount" >
                                <span>2、全场<input value={shopData.discount} onChange={e=>this.updateMod(e.target.value,'discount')} className="textWidth" placeholder="折扣" type="text"/>折</span>
                            </div>
                    </div>
                    <div className="bg">
                        <label>详细地址:</label>
                        <input type="text" value={shopData.address} placeholder="请输入详细地址" onChange={e=>this.updateMod(e.target.value,'address')}/>
                        <span className="position" onClick={()=>this.selectAddr()}>
                            <span>
                                <i style={{fontSize:'30px'}} className="iconfont icon-faxian6"></i>
                                <span >点击地图</span>
                            </span>
                        </span>
                    </div>

                    <div className="bg">
                        <TextareaItem
                            title={<label>简介:</label>}
                            placeholder="请输入简介"
                            data-seed="logId"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            rows={4}
                            count={500}
                            value={shopData.introduction}
                            onChange={(value)=>this.updateMod(value,'introduction')}
                            />
                    </div>
                    <ImagePicker
                        files={sfiles}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log('ffffffff',index, fs)}
                        selectable={sfiles.length < 1}
                        multiple={false}
                        />
                </div>
                <WingBlank />
                <div className="shops-common enviroment">
                    <h2>店铺环境图片</h2>
                    <ImagePicker
                        files={elementImgs}
                        onChange={this.onChange2}
                        onImageClick={(index, fs) => console.log('ffffffff',index, fs)}
                        selectable={elementImgs.length < 3}
                        multiple={false}
                        />
                </div>
                <WingBlank />
                <div className="shops-common barber">
                    <h2><span>商品信息：</span><span className="btn" onClick={e=>{this.addItem('itemList')}}>添加商品</span></h2>
                    {shopData.itemList&&shopData.itemList.map((x,i)=>{
                        return (
                            <div key={i+'item'} className="bg-barber">
                                <div className="bg">
                                    <lable>商品名称:</lable>
                                    <input type="text" value={x.name} placeholder="请输入商品名称" onChange={e=>this.updateMod2(e.target.value,'itemList','name',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>商城价格:</lable>
                                    <input type="text" value={x.price} placeholder="请输入商城价格" onChange={e=>this.updateMod2(e.target.value,'itemList','price',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>门店价:</lable>
                                    <input type="text" value={x.shopPrice} placeholder="请输入门店价" onChange={e=>this.updateMod2(e.target.value,'itemList','shopPrice',i)}/>
                                </div>
                                {i>0&&
                                <div className="del">
                                    <span className="btn-del"  onClick={()=>this.deleteBtn('itemList',i)}>删 除</span>
                                </div>}
                            </div>
                        )
                    })}

                </div>
                <WingBlank />
                <div className="shops-common barber">
                    <h2><span>美发师信息：</span><span className="btn"  onClick={e=>{this.addItem('shopBarberList')}}>添加美发师</span></h2>
                        {shopData.shopBarberList&&shopData.shopBarberList.map((x,i)=>{
                            return (<div key={i} className="bg-barber">
                                <div className="bg">
                                    <lable>姓名:</lable>
                                    <input type="text" value={x.name} placeholder="请输入姓名" onChange={e=>this.updateMod2(e.target.value,'shopBarberList','name',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>等级:</lable>
                                    <input type="text" value={x.grade} placeholder="请输入等级" onChange={e=>this.updateMod2(e.target.value,'shopBarberList','grade',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>预约费用:</lable>
                                    <input type="text" value={x.appoitTips} placeholder="请输入预约费" onChange={e=>this.updateMod2(e.target.value,'shopBarberList','appoitTips',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>工作经验:</lable>
                                    <input type="text" value={x.times} placeholder="请输入工作经验" onChange={e=>this.updateMod2(e.target.value,'shopBarberList','times',i)}/>
                                </div>
                                <div className="bg">
                                    <lable>上班时间:</lable>
                                    <input type="text" value={x.workTime} placeholder="请输入上班时间" onChange={e=>this.updateMod2(e.target.value,'shopBarberList','workTime',i)}/>
                                </div>
                                {i>0&&<div className="del">
                                    <span className="btn-del"  onClick={()=>this.deleteBtn('shopBarberList',i)}>删 除</span>
                                </div>}
                            </div>)
                        })}
                </div>
                <div className="btn">
                    <span className="btn-left" onClick={()=>this.okBtn('cancel')}>重置</span>
                    <span className="btn-right"  onClick={()=>this.okBtn('add')}>保存</span>
                </div>
                <MamaTabBar selectedTab='shopsTab' />
            </div>
        );
    }
}

module.exports = Test;
