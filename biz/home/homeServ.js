import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {

    static dataServ(params) {
        return Request({
            url: "qiuming/beauty/shop/list",
            type: "GET",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
    static searchServ(params) {
        return Request({
            url: "qiuming/beauty/member/register",
            type: "POST",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
};