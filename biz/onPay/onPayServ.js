import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
    static payOrderServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/pay",
            headers: {
                "Content-type": "application/json",
            },
            type: "POST",
            data: params
        })
    }
};