/**
 * 检查工具
 */
const Verify = {};
/**
 * 身份证正则判断
 * @param str
 * @returns {boolean}
 */
Verify.checkIdCard = function(num){
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){
        // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15){
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay){
            // alert('输入的身份证号里出生日期不对！');
            return false;
        }else{
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for(i = 0; i < 17; i ++){
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return num;
        }
    }
    if (len == 18){
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            // alert(dtmBirth.getYear());
            // alert(arrSplit[2]);
            // alert('输入的身份证号里出生日期不对！');
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for(i = 0; i < 17; i ++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                // alert('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return num;
        }
    }
    return false;
};
/**
 * Emoji正则判断
 * @param str
 * @returns {boolean}
 */
Verify.hasEmoji = function(str){
    var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;//表情
    if (str.match(regRule)) {
        //含有表情的返回true
        return true;
    }else {
        //没有返回false
        return false;
    }
};
/**
 * 手机号正则判断
 * @param str
 * @returns {boolean}
 */
Verify.isPhoneNum = function(str){
    var regRule = /^1[3|4|5|7|8][0-9]{9}$/;
    if (str.search(regRule) == -1) {
        //不是手机号的返回值
        return false;
    }else {
        return true;
    }
};
/**
 * email格式正则判断
 * @param str
 * @returns {boolean}
 */
Verify.checkEmail = function(str){
    var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (pattern.test(str)) {
        //正确
        return true;
    }else {
        return false;
    }
};
/**
 * 双字节字符串正则判断
 * @param str
 * @returns {boolean}
 */
Verify.hasDoubleBitStr = function(str){
    var pattern = /[^\x00-\xff]/;
    if (pattern.test(str)) {
        //正确
        return true;
    }else {
        return false;
    }
};
/**
 * 中文字符串正则判断
 * @param str
 * @returns {boolean}
 */
Verify.hasChineseStr = function(str){
    var pattern = /[\u4e00-\u9fa5]/;
    if (pattern.test(str)) {
        //正确
        return true;
    }else {
        return false;
    }
};
Verify.stateUp = function(name, value) {
    name = name.split(".");
    let state = this.state;
    name.map((item,i)=> {
        if(i + 1 == name.length){
            state[item] = value;
        }else{
            state = state[item]
        }
    });
    this.forceUpdate();
}

/*
* 判断对象是否存在
* obj需要验证的对象，name需要验证是否存在于对象的子对象名
* */
Verify.objExistence = function(obj,name){
    let objNameText = "";
    let state = false;
    for(let i in obj){
        if(i == name && obj[i]){
            state = true;
        };
    }
    return state;
};

Verify.regexPassword = function(str){
    var reg = /^(?![\d]+$)(?![a-zA-Z]+$)[0-9a-zA-Z\u0000-\u00FF]+$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};



export default Verify;