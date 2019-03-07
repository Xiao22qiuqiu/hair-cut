import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
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
    //ȡ������
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
    //��ɶ���
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