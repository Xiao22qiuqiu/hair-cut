import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //�µ�
    static getOrderServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/submit",
            type: "POST",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
    static getUserServ(params) {
        return Request({
            url: "qiuming/beauty/member/get/detail",
            type: "GET",
            data: params
        })
    }
};