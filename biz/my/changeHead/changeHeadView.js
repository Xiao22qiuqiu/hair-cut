import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {browserHistory,hashHistory} from 'react-router'
import {inject,observer} from 'mobx-react';
import {Icon, Button,NavBar,ImagePicker} from 'antd-mobile';
import { tabs , StarRange} from 'Widget';
import { StickyContainer, Sticky } from 'react-sticky';
import Config from 'config/Config';
import Util from 'util';
import Style from './changeHeadLess.less';

/**
 * 后台添加属性第一次评论：‘去评论’，第二次评论：‘追评’
 * 视图层，功能逻辑，html代码将存放于此
 * -------------门店组件-----------
 */
//inject从props中获取相应的数据
@inject("changeHead")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.changeHead;
    }

    //组件输出到 DOM 后会执行 componentDidMount() 钩子
    componentDidMount() {
    }

    //上传照片
    onChange = (files, type, index) => {
        this.stores.onImg(files, type, index)
    }
    submitAsk= () => {
        this.stores.onSubmit()
    }

    render() {
        let {files}=this.stores.state
        return (
            <div className="changeHead">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >换头像
                </NavBar>
                <div style={{background:'#fff'}}>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log('ffffffff',index, fs)}
                        selectable={files.length < 1}
                        multiple={false}
                        />
                    <div className="submit-btn">
                        <Button type="primary" onClick={()=>this.submitAsk() }>确 定</Button>
                    </div>
                </div>

            </div>
        );
    }
}

module.exports = Test;
