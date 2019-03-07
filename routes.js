// 进入路由触发的钩子函数
function rootOnEnter(nextState, replace) {
    var urlInfo = nextState.location.pathname;
    //修改标题
    let urlKey = urlInfo.split('/')[1];
    // 回到顶部
    window.scrollTo(0, 0);
}

// 离开路由触发的钩子函数
function rootOnLeave(prevState) {
    var urlInfo = prevState.location.pathname + prevState.location.search;
    if (urlInfo != '/login') { //如果是法律申明，也不用回跳
        window.app.currentRouterPath = urlInfo;
    }
}

// 设置title信息
function titleText(title) {
    document.title = title;
    //部分ios标题设置错误
    var $iframe = $('<iframe frameborder="no" border="0" vspace="0" hspace="0" marginwidth="0" margin' +
        'height="0" framespacing="0" frameborder="0" scrolling="no" src=""></iframe>').on('load', function() {
        setTimeout(function() {
            $iframe
                .off('load')
                .remove()
        }, 0)
    }).appendTo($('body'))
}

export default [

    {
        path: '/',
        component: require('./app'),
        childRoutes: [
            {
                //登录
                path: '/login',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/login/loginView'))
                        titleText("登录")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //注册
                path: '/register',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/register/registerView'))
                        titleText("注册")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //首页
                path: '/home',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/home/homeView'))
                        titleText("首页")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //店铺列表
                path: '/shops',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/shops/shopsView'))
                        titleText("门店")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //时尚资讯
                path: '/onShow',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/onShow/onShowView'))
                        titleText("时尚资讯")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //订单列表
                path: '/orderList',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/orderList/orderListView'))
                        titleText("订单列表")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //订单列表
                path: '/comment',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/comment/commentView'))
                        titleText("评论区")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //订单详情
                path: '/payOrder',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/payOrder/payOrderView'))
                        titleText("订单详情")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //下单，购买操作
                path: '/newpayOrder',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/newpayOrder/newpayOrderView'))
                        titleText("下单")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //支付
                path: '/onPay',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/onPay/onPayView'))
                        titleText("支付")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //个人中心
                path: '/my/personalCenter',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/personalCenter/personalCenterView'))
                        titleText("个人中心")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //换头像
                path: '/my/changeHead',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/changeHead/changeHeadView'))
                        titleText("换头像")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //个人信息
                path: '/my/perMessage',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/perMessage/perMessageView'))
                        titleText("个人信息")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //修改密码
                path: '/my/editKey',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/my/editKey/editKeyView'))
                        titleText("修改密码")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //用户列表,管理员重置密码功能
                path: '/userList',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/userList/userListView'))
                        titleText("用户列表")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
            {
                //发布店铺
                path: '/addShop',
                getComponent: (nextState, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./biz/addShop/addShopView'))
                        titleText("发布店铺")
                    })
                },
                onEnter: rootOnEnter,
                onLeave: rootOnLeave
            },
        ]
    },
]