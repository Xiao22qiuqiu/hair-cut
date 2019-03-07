/**
 * Created by chen.qiuming on 2018/4/29.
 */
const Check = {};
/**
 * 手机号正则判断
 * @param str
 * @returns {boolean}
 */
Check.isPhoneNum = function(str){
    var regRule = /^1[3|4|5|7|8][0-9]{9}$/;
    if (str.search(regRule) == -1) {
        //不是手机号的返回值
        return false;
    }else {
        return true;
    }
};
export default Check;