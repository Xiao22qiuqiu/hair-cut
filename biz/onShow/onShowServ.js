import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static dataServ(params) {
        return Request({
            url: "qiuming/beauty/shop/show",
            type: "GET",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
};