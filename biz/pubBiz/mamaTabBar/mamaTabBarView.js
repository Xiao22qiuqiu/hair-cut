import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import tabStyle from './mamaTabBarLess.less';
import { TabBar } from 'antd-mobile';

//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
/**
 * 视图层，功能逻辑，html代码将存放于此
 * ------------底部导航组件-------------
 */

// 菜单数据 
const tabBardata = [
    {
        name:'用户管理',
        icon: ['manage_index.png', 'manage_indexed.png'],
        target:'/userList',
        activityTab:'indexTab'
    },
    {
        name:'发布店铺',
        icon: ['tabbar_shop.png', 'tabbar_shoped.png'],
        target:'/addShop',
        activityTab:'shopsTab'
    }
]

class tabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'indexTab',
            hidden: false,
            fullScreen: true,
        };
    }

    hideTabBar(){
        // e.preventDefault();
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    componentDidMount(){
        // 当前选中的选项卡
        if(!!this.props.selectedTab){
          this.setState({
            selectedTab: this.props.selectedTab
          })
        }
    }

    // 选项卡点击
    onTabBarClick(currKey, gotoUrl) {
        this.setState({
            selectedTab: currKey,
        });
        if('indexTab' === '' + currKey){
            this.title='';
        }
        window.app.routerGoTo(gotoUrl)
        
    }

    // 是否iPhoneX
    isIphoneX() {
        if(/iphone/ig.test(navigator.userAgent)) {
            // (window.innerWidth == 375*3) && (window.innerHeight == 724*3)
           return window.devicePixelRatio === 3 && (screen.height == 812 && screen.width == 375)
        }
        return false;
    }

    // 获取tabBar样式
    getTabBarStyle(){
        let style = { position: 'fixed', height: '1.5rem', width: '100%', bottom: '-0.52rem' }
        if(this.isIphoneX()) {
            style.bottom = 0;
            style.height = '2rem'
        }
        return style
    }

    getIconStyle(item, index) {
        return {backgroundImage:`url(assets/images/mainContent/${item.icon[index]})`}
    }
    

    render() {
      let selectedTab = this.state.selectedTab;
        return (
            <div className="tab-bar-page"  style={this.state.fullScreen ? this.getTabBarStyle() : { height: '100%' }}>
                <TabBar
                    unselectedTintColor="#707070"
                    tintColor="#d4237a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                {tabBardata && tabBardata.map(item=> <TabBar.Item
                    title={item.name}
                    key={item.activityTab}
                    icon={<div className="tab_page_icon" style={this.getIconStyle(item,0)} ></div>}
                    selectedIcon={<div className="tab_page_icon"style={this.getIconStyle(item,1)} ></div>}
                    selected={selectedTab === item.activityTab}
                    onPress={() => this.onTabBarClick(item.activityTab, item.target)}/>)}
                </TabBar>
            </div>
        );
    }
}

module.exports = tabBar;
