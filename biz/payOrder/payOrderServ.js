import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //∂©µ•œÍ«È
    static getOrderServ(params) {
        return Request({
            url: "qiuming/beauty/trade/order/detail",
            headers: {
                "Content-type": "application/json",
            },
            type: "GET",
            data: params
        })
    }
};