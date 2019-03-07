/**
 * 别删！！！
 * props参数
 * cascade 默认是1  //2级就传1，3级就传2
 * ok  //func(item)  选择之后的回调函数, item是选中的市
 */
import React, {PropTypes, Component} from 'react';
import { Flex, Toast, Modal, Icon, } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';    //react-sticky - React最强大可用的粘性库
import Request from "util/Request";
import './tabComponetLess.less';

class tabComponetView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tittle:[],
        }
    }

    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    render() {

        return (
            <div>
                <WhiteSpace />
                <StickyContainer>
                    <Tabs tabs={this.tabs}
                          initalPage={'t2'}
                          renderTabBar={this.renderTabBar}
                        >
                        <div className="tabs">
                            {}
                        </div>
                        <div className="tabs">
                            {}
                        </div>
                        <div className="tabs">
                            {}
                        </div>
                    </Tabs>
                </StickyContainer>
                <WhiteSpace />
            </div>
        )
    }
}

module.exports = tabComponetView;