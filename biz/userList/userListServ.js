import React, { PropTypes, Component } from 'react';
import Request from "util/Request";
export default class {
    //用户列表
    static userListServ(params) {
        return Request({
            url: "qiuming/beauty/mgmt/system/member/list",
            type: "GET",
            data: params
        })
    }
    //重置密码
    static resetKeyServ(params) {
        return Request({
            url: "qiuming/beauty/mgmt/system/member/reset/password",
            headers: {
                "Content-type": "application/json",
            },
            type: "POST",
            data: params
        })
    }
};