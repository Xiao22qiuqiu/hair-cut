import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {Flex, NavBar, Icon,List, InputItem,Button} from 'antd-mobile';
import { tabs , StarRange} from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './editKeyLess.less';
const Item = List.Item;
const Brief = Item.Brief;

/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("editKey")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.editKey;
    }
    state={
        inputIndex:0,
    }

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
    }
    onFocus(value){
        this.setState({inputIndex:value});
    }
    updatePsw(name,value){
        this.stores.updatePswMod(name,value);
    }
    submitAskPrice(){
        this.stores.subMit();
    }

    render() {
        let { inputIndex }=this.state
        let{ user }=this.stores.state
        return (
            <div className="editKey">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >修改密码
                </NavBar>

                <div className="fill-form">
                    <InputItem
                        type="password"
                        placeholder="请输入登录密码"
                        ref={el => this.labelFocusInst = el}
                        onClick={()=>this.onFocus(0)}
                        className={inputIndex == 0 ? 'selected' : ''}
                        data-index="0"
                        value={user.oldPassword}
                        onChange={e => {this.updatePsw('oldPassword',e)}}
                        ><div className="required" onClick={() => this.labelFocusInst.focus()}>登录密码</div></InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入修改密码"
                        ref={el => this.labelFocusInst = el}
                        data-index="1"
                        onClick={()=>this.onFocus(1)}
                        className={inputIndex == 1 ? 'selected' : ''}
                        value={user.password}
                        onChange={e => {this.updatePsw('password',e)}}
                        ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }>修改密码</div></InputItem>
                    <InputItem
                        type="password"
                        placeholder="请再次确认密码"
                        ref={el => this.labelFocusInst = el}
                        data-index="2"
                        onClick={()=>this.onFocus(2)}
                        className={inputIndex == 2 ? 'selected' : ''}
                        value={user.confirmPwd}
                        onChange={ e => {this.updatePsw('confirmPwd',e)}}
                        ><div className="required" onClick={(e) => { this.labelFocusInst.focus(); this.onFocus()} }>重输密码</div></InputItem>
                    <p className="fill-tips fz_24">*位置不能为空</p>
                </div>
                <div className="submit-btn">
                    <Button type="primary" onClick={()=>this.submitAskPrice() }>确 定</Button>
                </div>
            </div>
        );
    }
}

module.exports = Test;
