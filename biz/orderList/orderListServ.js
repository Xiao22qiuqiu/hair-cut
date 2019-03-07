import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //店铺详情
    static orderLists(params) {
        return Request({
            url: "qiuming/beauty/trade/order/list",
            headers: {
                "Content-type": "application/json",
            },
            type: "GET",
            data: params
        })
    }
    //
    //取消订单
    static cancelOrderServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/cancel",
            headers: {
                "Content-type": "application/json",
            },
            type: "POST",
            data: params
        })
    }
    //完成订单
    static okOrderServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/finish",
            headers: {
                "Content-type": "application/json",
            },
            type: "POST",
            data: params
        })
    }
};