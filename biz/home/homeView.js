import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { Flex, Toast, Carousel, Icon ,Button} from 'antd-mobile';
import {cloneDeep} from 'lodash'
//地址选择组件
import AddressPicker from '../../widget/addressPicker/AddressPickerView.js';
import Config from 'config/Config';
import Util from 'util';
import Style from './homeLess.less';
import TabBar from '../pubBiz/tabBar/tabBarView'
/**
 * 视图层，功能逻辑，html代码将存放于此
 * -------------首页组件----------
 */
//inject从props中获取相应的数据
@inject("home")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.home;
    }
    componentDidMount() {
        this.stores.mockText();
    }
    //选择地址
    selectAddr = () => {
        this.refs.addrModal.openModal();
    }
    //跳转
    toUrl(url) {
         window.app.routerGoTo(url);
        //console.log(url)
        //location.href = url;
    }
    showScore(val){
        for(let i=0;i<val.score;i++){
            render (<span className='iconfont icon-xingxing' style={{color:'#FFD21F'}}></span>)
        }
    }
    //搜索输入
    updateMod(value,name) {
        this.stores.updateModel(value,name)
    }
    //搜索
    onSearch() {
        this.stores.searchModel()
    }

    render() {
        let {position, adList, shopsList,shopName}=this.stores.state;
        return (
            <div className="home-page">

                <Flex className="home-header">
                    <Flex className="position" onClick={this.selectAddr}>
                        <i className="iconfont icon-faxian6"></i>
                        <span className="ellipsis">{position && position.label}</span>
                    </Flex>

                    <Flex.Item className="input-wrap">
                        <input value={shopName} className="input-box" placeholder="搜索您想要的商家"
                               onChange={e=>this.updateMod(e.target.value,'shopName')}>
                        </input>
                    </Flex.Item>
                    <Flex>
                        <span className="iconfont icon-sousuo1 search" onClick={e=>this.onSearch()}></span>
                    </Flex>
                </Flex>
                <div className="carousels">
                    {
                        adList && (
                            <Carousel
                                className="banner-slide"
                                autoplay={true}
                                infinite
                                selectedIndex={0}
                                dots={true}
                                swipeSpeed={35} >

                                {
                                    adList.map((item, index) => {
                                        return (
                                            <div className="banner-item-wrap" key={index} onClick={this.toUrl.bind(this, `/shops?id=${item.id}`)}>
                                                <img className="banner-item" src={'data:image/png;base64,'+item.shopImage} />
                                            </div>
                                        )
                                    })
                                }

                            </Carousel>

                        )
                    }
                </div>
                <div className="shopsList">
                    <ul>
                        {
                            shopsList.length<1?<div>
                                {
                                    Toast.loading('Loading...', 3)
                                }
                            </div>:''
                        }
                        {
                            shopsList && shopsList.map((item, index) => {
                                return (
                                    <li className='pdt_item' key={index} onClick={this.toUrl.bind(this, `/shops?id=${item.id}`)}>
                                        <div className='pdt_cover'>
                                            <img src={'data:image/png;base64,'+item.shopImage} />
                                        </div>

                                        <div className='pdt_infoBox'>
                                            <div className='pdt_info1'>{item.shopName}</div>

                                            <div className='pdt_info2'>
                                                <div className='pdt_discounts'>
                                                    {item.discount&&<span className='iconfont icon-dazheicon' style={{color:'#d4237a'}}>{item.discount}</span>}
                                                    {item.coupon&&<span><span className='iconfont icon-youhui3' style={{color:'#FFD21F'}}></span>
                                                    <span style={{color:'red',marginLeft:'8px'}}>减{item.coupon}</span></span>}
                                                </div>
                                                <div className='pdt_info_comment'>
                                                    <span className='iconfont icon-faxian1'>{item.watchCount}</span>
                                                </div>
                                                <div className='pdt_info_comment'>
                                                    <span className='iconfont icon-pinglun'>{item.commentCount}</span>
                                                </div>
                                            </div>
                                            <div className='pdt_info2'>
                                                <span className='iconfont icon-ditu3' style={{color:'#1296db'}}></span>
                                                {/*<span>{item.publishTime&&Util.formatDate(item.publishTime)}</span>*/}
                                                <span className='ellipsis'>{item.address}</span>
                                            </div>

                                        </div>

                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>

                <TabBar selectedTab='indexTab' />
                <AddressPicker ref="addrModal"
                               cascade={2}
                               ok={(item,areaList) => {
                    this.stores.setPosition(item,areaList);
                }} />

            </div>
        );
    }
}

module.exports = Test;
