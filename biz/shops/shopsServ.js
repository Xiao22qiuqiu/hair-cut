import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
    static shopDetail(params) {
        return Request({
            url: "qiuming/beauty/shop/detail",
            type: "GET",
            data: params
        })
    }
    //��������
    static shopComment(params) {
        return Request({
            url: "qiuming/beauty/trade/order/comment/list",
            type: "GET",
            data: params
        })
    }
};