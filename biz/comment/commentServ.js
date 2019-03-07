import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //评论
    static submitServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/comment/add",
            type: "POST",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
};