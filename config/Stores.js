import test from 'biz/demo/test/TestMod';
import test3 from 'biz/demo/test3/TestMod';
import register from 'biz/register/registerMod'; //注册
import login from 'biz/login/loginMod'; //登录
import home from 'biz/home/homeMod'; //首页
import shops from 'biz/shops/shopsMod';//店铺页
import personalCenter from 'biz/my/personalCenter/personalCenterMod';//个人中心
import userList from 'biz/userList/userListMod';  //用户列表，重置密码
import addShop from 'biz/addShop/addShopMod';  //发布店铺
import onShow from 'biz/onShow/onShowMod';  //发布店铺
import orderList from 'biz/orderList/orderListMod';  //订单列表
import resetKey from 'biz/resetKey/resetKeyMod';  //重置密码列表
import payOrder from 'biz/payOrder/payOrderMod';  //订单详情
import newpayOrder from 'biz/newpayOrder/newpayOrderMod';  //提交订单
import onPay from 'biz/onPay/onPayMod';  //订单支付
import perMessage from 'biz/my/perMessage/perMessageMod';  //个人信息
import editKey from 'biz/my/editKey/editKeyMod';  //修改密码
import comment from 'biz/comment/commentMod';  //发布评论
import changeHead from 'biz/my/changeHead/changeHeadMod';  //发布评论



//在这里为所有的组件进行导出，将其注册到根组件
export default{
    test,
    test3,
    login,
    register,
    home,
    onShow,
    shops,
    orderList,
    personalCenter,
    userList,
    addShop,
    resetKey,
    payOrder,
    newpayOrder,
    onPay,
    perMessage,
    editKey,
    comment,
    changeHead,
}