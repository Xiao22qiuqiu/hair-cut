/**
 * 常用工具类
 */
import React, {Component} from 'react';

class util {
    //判断是安卓还是ios
    static androidOrios() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
            return "Android"

        }
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return "IOS"
        }
    }
    //给local缓存值
    static setLocalCache(c_name, value) {
        // console.info
        localStorage.setItem(c_name, JSON.stringify(value))
    }

    //取回local
    static getLocalCache(c_name) {
        var tem = localStorage.getItem(c_name);
        return tem;
    }
    //设置cookie
    static getLocalCache(c_name, value, expiredays = 3600000) {
        var exdate = new Date()
        exdate.setTime(exdate.getTime() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }
    //取回cookie
    static getLocalCache(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return "";
    }

    //从url取值
    static getQueryString(name = '') {
        var after = window.location.hash.split("?")[1] || '';
        if (after && name) {
            var reg = new RegExp("(^|&)" + name.trim() + "=([^&]*)(&|$)");
            var r = after.trim().match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            else {
                return null;
            }
        }
    }
    //时间转换
    static formatDate(str, type = 1) {
        let [y, m, d, h, min, s] = str.replace(/[-|:]/g, " ").split(" ");
        let ns = "";
        switch (type) {
            case 1:
                ns = y + "." + m + "." + d
                break
            case 2:
                ns = y + "." + m + "." + d + " " + h + ":" + min + ":" + s
                break
        }
        return ns
    }
}


export default util;