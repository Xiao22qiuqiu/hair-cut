import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½
    static shopDetail(params) {
        return Request({
            url: "qiuming/beauty/shop/detail",
            type: "GET",
            data: params
        })
    }
    //µêÆÌÆÀÂÛ
    static shopComment(params) {
        return Request({
            url: "qiuming/beauty/trade/order/comment/list",
            type: "GET",
            data: params
        })
    }
};