/**
 * Created by Yike on 2018/3/29.
 * 区别于antd-mobile的Tabs组件，适用于不会切换div的。
 * 用法
 * <Tabs
 *      onTabClick={func(index)}   //传入函数， index 表示组件的顺序
 *      tabs=["距离最近", "价格最便宜"]   //
 *      exact={<div>地址选择</div>}     // 添加一个额外的View,不响应onTabClick
 *      className="xxx"
 * />
 */

import React, { PropTypes, Component } from 'react';
import { Flex } from 'antd-mobile';

import './index.less';

class Tabs extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            index: 0,
        }
    }

    onTabClick = (index) => {
        this.setState({
            index: index
        })
        this.props.onTabClick && this.props.onTabClick(index);
    }

    render() {

        let { tabs = [], className = '', exact = null, } = this.props;

        return (
            <Flex className={`tabs-widget ${className}`}>
                {
                    tabs.map((item, index) => {
                        let classname = 'tab-bar-box';
                        if (index === this.state.index) {
                            classname += ' tab-bar-box-active';
                        }
                        return (
                            <Flex className={classname} justify="center" key={'tab' + index} onClick={this.onTabClick.bind(this, index)}>
                                <div className="tab-bar">
                                    {item}
                                </div>
                            </Flex>
                        )
                    })
                }

                { exact }

            </Flex>
        )
    }
}

module.exports = Tabs;